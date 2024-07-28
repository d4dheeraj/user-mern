import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import UserModal from "../../components/Modal";
import { BASE_URL, errMsg } from "../../constants/apiConstants";

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const getUsers = async () => {
    try {
      const users = await axios.get(BASE_URL + "user");
      const response = users.data;
      if (response.success) {
        setUsers(response.users);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.log(errMsg, err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleClose = () => {
    getUsers();
  };

  return (
    <div>
      <Table users={users} error={error} />
      <UserModal handleClose={handleClose} />
    </div>
  );
};

export default UserGrid;
