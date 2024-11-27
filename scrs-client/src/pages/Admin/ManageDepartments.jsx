"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AddDepartmentForm from "@/components/AddDepartmentForm";
import BulkUpload from "@/components/BulkUploadDepts";
import DepartmentTable from "@/components/DepartmentsTable";
import { getDepts } from "@/api";

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const response = await getDepts();
        setDepartments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepts();
  }, []);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddDepartment = (newDepartment) => {
    if (newDepartment.id) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === newDepartment.id ? newDepartment : dept
        )
      );
    } else {
      setDepartments((prev) => [
        ...prev,
        { ...newDepartment, id: prev.length + 1 },
      ]);
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleEditDepartment = (dept) => {
    setEditingDepartment(dept);
    setIsEditModalOpen(true);
  };

  const handleDeleteDepartment = (id) => {
    setDepartments((prev) => prev.filter((dept) => dept.id !== id));
  };

  const handleBulkUpload = (csvData) => {
    // Process CSV data and add to departments
    // This is a placeholder implementation
    const newDepartments = csvData
      .split("\n")
      .slice(1) // Skip header row
      .map((row, index) => {
        const [name, sn, hod] = row.split(",");
        return { id: departments.length + index + 1, name, sn, hod };
      });
    setDepartments((prev) => [...prev, ...newDepartments]);
    setIsBulkUploadOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = departments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(departments.length / itemsPerPage);

  return (
    <div className="container p-4 mx-auto sm:p-6">
      <h1 className="mb-6 text-2xl font-bold">Manage Departments</h1>

      <div className="flex flex-col justify-end mb-6 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="w-full px-4 py-2 font-semibold text-white transition duration-300 ease-in-out rounded-lg shadow-md hover:bg-gray-700 sm:w-auto">
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="border-2 shadow-lg rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Add New Department
              </DialogTitle>
            </DialogHeader>
            <AddDepartmentForm onAddDepartment={handleAddDepartment} />
          </DialogContent>
        </Dialog>

        <Dialog open={isBulkUploadOpen} onOpenChange={setIsBulkUploadOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full px-4 py-2 font-semibold text-gray-600 transition duration-300 ease-in-out border-2 rounded-lg shadow-md hover:bg-gray-100 sm:w-auto"
            >
              Bulk Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="border-2 shadow-lg rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Upload CSV File
              </DialogTitle>
            </DialogHeader>
            <BulkUpload onUpload={handleBulkUpload} />
          </DialogContent>
        </Dialog>
      </div>

      <DepartmentTable
        departments={currentItems}
        onEdit={handleEditDepartment}
        onDelete={handleDeleteDepartment}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 font-semibold text-white transition duration-300 ease-in-out rounded-lg shadow-md hover:bg-gray-600"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 font-semibold text-white transition duration-300 ease-in-out rounded-lg shadow-md hover:bg-gray-600"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="border-2 shadow-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Edit Department
            </DialogTitle>
          </DialogHeader>
          <AddDepartmentForm
            onAddDepartment={handleAddDepartment}
            isEdit={true}
            initialDepartment={editingDepartment || undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}