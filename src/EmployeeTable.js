import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [sortBy] = useState('firstName');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/employees/list`, {
        params: { page, size, sortBy },
      });
      setEmployees(response.data.results);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:8080/api/employees/${id}`);
        alert('Employee deleted successfully');
        fetchEmployees(); // Refresh the list
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const navigateToUpdate = (id) => {
    window.location.href = `/update-employee/${id}`;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Employee List</h1>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => navigateToUpdate(employee.id)}
                >
                  <FaEdit /> Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          disabled={page + 1 === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
