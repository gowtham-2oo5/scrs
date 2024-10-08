package com.scrs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scrs.dto.LoginDTO;
import com.scrs.dto.OtpDTO;
import com.scrs.dto.ResponseDTO;
//import com.scrs.model.UserModel;
import com.scrs.service.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserService userService;

	@GetMapping("")
	public ResponseEntity<String> testinAuth() {
		return new ResponseEntity<>("Path working bro, all good", HttpStatus.OK);
	}

	@PostMapping("login")
	public ResponseEntity<String> loginUser(@RequestBody LoginDTO loginInfo) {
		String msg = userService.authenticate(loginInfo.getUsername(), loginInfo.getPassword());

		if (msg.startsWith("OTP has been sent")) {

			return new ResponseEntity<String>(msg, HttpStatus.ACCEPTED);

		} else if (msg.equalsIgnoreCase("Invalid Credentials")) {

			return new ResponseEntity<String>(msg, HttpStatus.UNAUTHORIZED);

		} else if (msg.equalsIgnoreCase("User doesn't exist")) {

			return new ResponseEntity<String>(msg, HttpStatus.NOT_FOUND);

		} else {

			return new ResponseEntity<String>("An error occurred", HttpStatus.BAD_REQUEST);

		}
	}

	@PostMapping("verify-otp")
	public ResponseEntity<ResponseDTO> verifyOtp(@RequestBody OtpDTO otp) {
		Object user = userService.verifyOtp(otp.getOtp());
		ResponseDTO response = null;
		if (user != null) {
			response = new ResponseDTO("OTP verified successfully", user, true);
			return new ResponseEntity<ResponseDTO>(response, HttpStatus.ACCEPTED);
		} else {
			response = new ResponseDTO("You have entered wrong OTP. Try again", user, false);
			return new ResponseEntity<ResponseDTO>(response, HttpStatus.NOT_ACCEPTABLE);
		}
	}

}
