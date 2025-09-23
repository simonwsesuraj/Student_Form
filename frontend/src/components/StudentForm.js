import React, { useState } from "react";
import axios from "axios";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dnumber: "",
    department: "",
    phone: "",
    email: "",
    address: "",
    mark_10: "",
    percentage_10: "",
    mark_12: "",
    percentage_12: "",
    dob: "",
    age: "",
    gender: "",
    ug_cgpa: "",
    ug_passed_out: "",
  });

  const [errors, setErrors] = useState({}); // store field errors
  const [successMessage, setSuccessMessage] = useState(""); // success message

  const departments = ["CSE", "IT", "ECE", "EEE", "MECH", "DS", "AI", "BT", "CH", "PH"];
  const genders = ["male", "female", "other"];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "mark_10" && value) {
      updatedData.percentage_10 = ((parseFloat(value) / 500) * 100).toFixed(2);
    }
    if (name === "mark_12" && value) {
      updatedData.percentage_12 = ((parseFloat(value) / 600) * 100).toFixed(2);
    }
    if (name === "dob" && value) {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      updatedData.age = age;
    }

    setFormData(updatedData);
    setErrors({ ...errors, [name]: "" }); // clear error when typing
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    try {
      await axios.post("https://your-backend.onrender.com/api/students/add/", formData);
      setSuccessMessage("✅ Form Submitted Successfully!");
      setFormData({
        name: "",
        dnumber: "",
        department: "",
        phone: "",
        email: "",
        address: "",
        mark_10: "",
        percentage_10: "",
        mark_12: "",
        percentage_12: "",
        dob: "",
        age: "",
        gender: "",
        ug_cgpa: "",
        ug_passed_out: "",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data); // set backend errors
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {/* Name */}
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" name="name" className="form-control"
          value={formData.name} onChange={handleChange} required />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>

      {/* Dnumber */}
      <div className="mb-3">
        <label className="form-label">D.Number</label>
        <input type="text" name="dnumber" className="form-control"
          value={formData.dnumber} onChange={handleChange} required />
        {errors.dnumber && <div className="text-danger">{errors.dnumber}</div>}
      </div>

      {/* Department */}
      <div className="mb-3">
        <label className="form-label">Department</label>
        <select name="department" className="form-select"
          value={formData.department} onChange={handleChange} required>
          <option value="">-- Select Department --</option>
          {departments.map((dep) => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
        {errors.department && <div className="text-danger">{errors.department}</div>}
      </div>

      {/* Phone */}
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input type="text" name="phone" className="form-control"
          value={formData.phone} onChange={handleChange} required />
        {errors.phone && <div className="text-danger">{errors.phone}</div>}
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" name="email" className="form-control"
          value={formData.email} onChange={handleChange} required />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </div>

      {/* Address */}
      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea name="address" className="form-control"
          value={formData.address} onChange={handleChange}></textarea>
        {errors.address && <div className="text-danger">{errors.address}</div>}
      </div>

      {/* 10th Marks */}
      <div className="mb-3">
        <label className="form-label">10th Marks (out of 500)</label>
        <input type="number" name="mark_10" className="form-control"
          value={formData.mark_10} onChange={handleChange} required />
        {errors.mark_10 && <div className="text-danger">{errors.mark_10}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">10th Percentage</label>
        <input type="text" name="percentage_10" className="form-control"
          value={formData.percentage_10} disabled />
      </div>

      {/* 12th Marks */}
      <div className="mb-3">
        <label className="form-label">12th Marks (out of 600)</label>
        <input type="number" name="mark_12" className="form-control"
          value={formData.mark_12} onChange={handleChange} required />
        {errors.mark_12 && <div className="text-danger">{errors.mark_12}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">12th Percentage</label>
        <input type="text" name="percentage_12" className="form-control"
          value={formData.percentage_12} disabled />
      </div>

      {/* DOB */}
      <div className="mb-3">
        <label className="form-label">Date of Birth</label>
        <input type="date" name="dob" className="form-control"
          value={formData.dob} onChange={handleChange} required />
        {errors.dob && <div className="text-danger">{errors.dob}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Age</label>
        <input type="text" name="age" className="form-control"
          value={formData.age} disabled />
      </div>

      {/* Gender */}
      <div className="mb-3">
        <label className="form-label">Gender</label>
        <select name="gender" className="form-select"
          value={formData.gender} onChange={handleChange} required>
          <option value="">-- Select Gender --</option>
          {genders.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        {errors.gender && <div className="text-danger">{errors.gender}</div>}
      </div>

      {/* UG CGPA */}
      <div className="mb-3">
        <label className="form-label">UG CGPA</label>
        <input type="number" step="0.01" name="ug_cgpa" className="form-control"
          value={formData.ug_cgpa} onChange={handleChange} required />
        {errors.ug_cgpa && <div className="text-danger">{errors.ug_cgpa}</div>}
      </div>

      {/* UG Passed Out */}
      <div className="mb-3">
        <label className="form-label">UG Passed Out</label>
        <input type="number" name="ug_passed_out" className="form-control"
          value={formData.ug_passed_out} onChange={handleChange} required />
        {errors.ug_passed_out && <div className="text-danger">{errors.ug_passed_out}</div>}
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  );
};

export default StudentForm;
