import axios from "axios";
import React, { useEffect, useState } from "react";
// import { API } from "../api";
const bkuri = import.meta.env.VITE_BACK
export default function UsersList({ onSelect }) {
  const [users, setUsers] = useState([]);
  const me = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${bkuri}/api/users/allusers/${me._id}`);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };
  fetchUsers();
}, []);


  return (
    <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Users</h2>
      {users.map((u) => (
        <div key={u._id}
          onClick={() => onSelect(u)}
          className="p-2 bg-white rounded mb-2 cursor-pointer hover:bg-blue-100">
          {u.name}
        </div>
      ))}
    </div>
  );
}
