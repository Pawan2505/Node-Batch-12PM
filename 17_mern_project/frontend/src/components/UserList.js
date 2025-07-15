import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('/api/admin/show');
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/admin/removedata/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <Link to="/add">Add User</Link>

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '50%', borderCollapse: 'collapse', margin:'auto' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Link to={`/edit/${user._id}`} style={{ marginRight: '10px' }}>Edit</Link>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
