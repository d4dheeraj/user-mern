const Header = () => {
  return (
    <div className="table-title">
      <div className="row mb-5">
        <div className="col-sm-6">
          <h2>Manage Users</h2>
        </div>
        <div className="col-sm-6">
          <div className="d-md-flex justify-content-md-end">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addUserModal"
            >
              <span className="fs-5">+</span> Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
