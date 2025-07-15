import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/admin/add', user);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add User</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddUser;
