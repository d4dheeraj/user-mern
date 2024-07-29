import React, { useRef, useState } from "react";
import axios from "axios";
import {
  BASE_URL,
  errMsg,
  userInitialValue,
} from "../../constants/apiConstants";
import InputText from "../../components/Controls/InputText";
import InputEmail from "../../components/Controls/InputEmail";

const UserModal = ({ handleClose }) => {
  const [user, setUser] = useState(userInitialValue);
  const modalRef = useRef(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    const modalElement = modalRef.current;
    modalElement.style.display = "none";
    modalElement.classList.remove("show");
    const backdrops = document.querySelectorAll(".modal-backdrop.show");
    backdrops.forEach((backdrop) => backdrop.remove());

    handleClose();
  };

  const createUser = async () => {
    try {
      const addUser = await axios.post(BASE_URL + "/user/create", user);
      const response = addUser.data;
      if (response.success) {
        setUser(userInitialValue);
        closeModal();
        alert("User added successfully");
      } else {
        console.log(errMsg, response);
      }
    } catch (err) {
      console.log("Error in handleSubmit", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <div id="addUserModal" className="modal fade" ref={modalRef}>
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
              <div className="form-group m-2">
                <InputText
                  label="First Name"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group m-2">
                <InputText
                  label="Last Name"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group m-2">
                <InputEmail
                  label="Email"
                  name="email"
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
                <button type="submit" className="btn btn-primary">
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
