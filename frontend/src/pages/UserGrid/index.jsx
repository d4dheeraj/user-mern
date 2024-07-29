import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Table from "../../components/Table";
import UserModal from "../Modal";
import { BASE_URL, errMsg } from "../../constants/apiConstants";

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/user`);
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError(new Error("Failed to fetch users."));
      }
    } catch (err) {
      setError(err);
      console.error(errMsg, err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleClose = () => {
    getUsers();
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <Table users={users} />
      )}
      <UserModal handleClose={handleClose} />
    </div>
  );
};

export default UserGrid;
