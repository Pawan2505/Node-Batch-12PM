import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  const loadUser = async () => {
    const res = await axios.get(`/api/admin/edit/${id}`);
    setUser(res.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/admin/updatedata/${id}`, user);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      <input name="name" value={user.name} onChange={handleChange} required />
      <input name="email" value={user.email} onChange={handleChange} required />
      <input name="phone" value={user.phone} onChange={handleChange} required />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditUser;
