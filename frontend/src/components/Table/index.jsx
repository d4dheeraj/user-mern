import TableRow from "./TableRow";
import Header from "./Header";
import "./index.css";

const Table = ({ users }) => {
  return (
    <div className="container">
      <div className="table-wrapper m-5">
        <Header />

        <div className="table-responsive table-scrollable">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => <TableRow key={user._id} user={user} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
