import React from "react";

const Table = ({ users, error }) => {
  return (
    <div className="container">
      <div className="table-wrapper m-5">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-6">
              <h2>Manage Employees</h2>
            </div>
            <div className="col-sm-6">
              <div className="d-md-flex justify-content-md-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#addUserModal"
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>

        {error ? (
          "Something went wrong while fetching users"
        ) : (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => (
                  <tr key={index}>
                    <td></td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;
