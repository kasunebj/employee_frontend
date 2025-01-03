import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({ firstName: '', lastName: '', email: '' });

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/employees/${id}`, employee);
      alert('Employee updated successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <h1>Update Employee</h1>
      <form onSubmit={updateEmployee}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={employee.firstName}
            onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={employee.lastName}
            onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
