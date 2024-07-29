import React, { useState, useEffect, useCallback } from "react";
import Table from "../../components/Table";
import UserModal from "../Modal";
import { errMsg } from "../../constants/apiConstants";
import { fetchUsers } from "../../utils";

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers("user");
      if (data.success) {
        setUsers(data.users);
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
