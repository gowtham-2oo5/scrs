// TODO: Un comment mailSender lines before review or shit
package com.scrs.service;

import java.security.SecureRandom;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.scrs.dto.AdminDTO;
import com.scrs.model.AdminModel;
import com.scrs.model.FacultyModel;
import com.scrs.model.StudentModel;
import com.scrs.model.UserModel;
import com.scrs.model.UserRole;
import com.scrs.repository.UserRepo;

import jakarta.mail.internet.MimeMessage;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JavaMailSender mailSender;

	private String username;

	private String generatedOtp;
	private long otpValidity = 300000; // 5 minutes
	private long otpGeneratedTime;

	@Override
	public void addUser(UserModel user) {
		userRepo.save(user);
	}

	@Override
	public List<UserModel> getAllUsers() {
		List<UserModel> users = userRepo.findAll();
		System.out.println("Fetched Data: ");
		users.forEach(user -> System.out.println(user));
		return users;
	}

	@Override
	public UserModel getUserById(UUID id) {
		return userRepo.findById(id).get();
	}

	@Override
	public String authenticate(String username, String password) {
		this.username = username;
		UserModel user = userRepo.findByUsername(username);

		if (user != null) {
			if (passwordEncoder.matches(password, user.getPassword())) {
				sendOtp(user.getEmail());
				String maskedEmail = maskEmail(user.getEmail());
				return "OTP has been sent to your email: " + maskedEmail;
			} else {
				return "Invalid Credentials";
			}
		} else {
			return "User doesn't exist";
		}
	}

	// Method to mask the email
	public String maskEmail(String email) {
		int atSymbolIndex = email.indexOf('@');
		if (atSymbolIndex <= 2) {
			// If email is too short to mask properly, return as is
			return email;
		}
		// Show first 2 characters and last 2 characters before @domain
		return email.substring(0, 2) + "****" + email.substring(atSymbolIndex - 2);
	}
	
	public void sendOtp(String mail) {
        // Generate 6-digit OTP
        SecureRandom secureRandom = new SecureRandom();
        generatedOtp = String.valueOf(secureRandom.nextInt(899999) + 100000); 
        otpGeneratedTime = System.currentTimeMillis();

        try {
            // Create a MimeMessage
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            // Set the recipient, subject, and email content
            helper.setTo(mail);
            helper.setSubject("Your OTP Code");

            String emailContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "  <style>" +
                    "    body { font-family: Arial, sans-serif; color: #333; }" +
                    "    .otp-container { background-color: #f4f4f4; padding: 20px; text-align: center; border-radius: 8px; width: 300px; margin: 0 auto; border: 1px solid #ddd; }" +
                    "    .otp-code { font-size: 24px; font-weight: bold; color: #2a9df4; margin-top: 10px; }" +
                    "  </style>" +
                    "</head>" +
                    "<body>" +
                    "  <div class='otp-container'>" +
                    "    <p>Your OTP code is:</p>" +
                    "    <p class='otp-code'>" + generatedOtp + "</p>" +
                    "  </div>" +
                    "</body>" +
                    "</html>";

            // Set the email content as HTML
            helper.setText(emailContent, true);

            // Send the email
            mailSender.send(message);

            // Log OTP generation (without logging the actual OTP in production)
            System.out.println("OTP sent to: " + mail);
            System.out.println("OTP is: " + generatedOtp);

        } catch (Exception e) {
            // Handle the error
            System.err.println("Failed to send OTP: " + e.getMessage());
        }
    }

	public boolean isExpired() {
		long expirationTime = 5 * 60 * 1000; // 5 minutes
		return System.currentTimeMillis() - otpGeneratedTime > expirationTime;
	}

	@SuppressWarnings("all")
	@Override
	public Object verifyOtp(String otp) {

		System.out.println("Given OTP: " + otp);
		System.out.println("Generated OTP: " + generatedOtp);
		System.out.println("Checking otp"+ otp.equals(generatedOtp));

		long currentTime = System.currentTimeMillis();

		if (generatedOtp.equals(otp) && (currentTime - otpGeneratedTime < otpValidity)) {
			System.out.println("OTP Verified bro");
			UserModel user = userRepo.findByUsername(username);

			// Check user role using the UserRole enum
			UserRole userRole = user.getUserRole(); // Retrieve the user's role

			switch (userRole) {
			case ADMIN:
				AdminModel adminModel = (AdminModel) user; // Cast to AdminModel
				AdminDTO admin = new AdminDTO(user, adminModel.isSuperAdmin());
				System.out.println(admin.toString());
				return admin; // Pass additional fields

			case FACULTY:
				FacultyModel faculty = (FacultyModel) user; // Cast to FacultyModel
				return null;
			// return new FacultyRegsDTO(user, faculty.getEmpId(), faculty.getDepartment(),
			// faculty.getJoinedAt(), faculty.getExperience(),
			// faculty.getInstructingCourse());

			case STUDENT:
				StudentModel student = (StudentModel) user; // Cast to StudentModel
				return null;
			// return new StudentDTO(user, student.getRegNum(), student.getSpecialization(),
			// student.getJoinedAt(), student.getYear(), student.getSemester());

			default:
				throw new IllegalArgumentException("Invalid user role: " + userRole);
			}

		} else {
			return null;
		}
	}

}
