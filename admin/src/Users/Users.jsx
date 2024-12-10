import React, { useEffect, useState } from "react";
import UserAPI from "../API/UserAPI";

function Users(props) {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const response = await UserAPI.getAllData();
    console.log(response);

    setUsers(response);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (idUser) => {
    try {
      await UserAPI.deleteUser(idUser);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Basic Initialisation
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Home
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Tables
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Users</h4>
                <input
                  className="form-control w-25"
                  type="text"
                  placeholder="Enter Search!"
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((value) => (
                          <tr key={value._id}>
                            <td>{value._id}</td>
                            <td>{value.fullname}</td>
                            <td>{value.email}</td>
                            <td>{value.phone}</td>
                            <td>
                              <a
                                href={"/users/" + value._id}
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-success"
                              >
                                Update
                              </a>
                              &nbsp;
                              <a
                                href="/users"
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-danger"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(value._id);
                                }}
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Users;
