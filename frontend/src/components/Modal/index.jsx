import React, { useState } from "react";
import axios from "axios";

const UserModal = ({ handleClose }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addUser = await axios.post(
        "http://localhost:8080/user/create",
        user
      );
      const response = addUser.data;
      if (response.success) {
        alert("User added successfully");
        handleClose();
        console.log("Success in handleSubmit", response);
      } else {
        console.log("Something went wrong", response);
      }
    } catch (err) {
      console.log("Error in handleSubmit", err);
    }
  };
  return (
    <div id="addUserModal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addUserModal">
                Add User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  required
                  name="firstName"
                  className="form-control"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  required
                  name="lastName"
                  className="form-control"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  name="email"
                  className="form-control"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
