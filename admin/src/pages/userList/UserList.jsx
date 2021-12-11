import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { userRequest } from "../../requestMethods";
import { deleteUser } from "../../redux/apiCalls";
import "./userList.css";

export default function UserList() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [popup, setPopup] = useState({
    show: false,
    id: null,
  });

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await userRequest.get("/users");

      setData(data.users);
    };

    getUsers();
  }, []);

  const handleDelete = () => {
    setPopup({
      show: true,
      id: null,
    });
  };

  const handleCancelDelete = () => {
    setPopup({
      show: false,
      id: null,
    });
  };

  const handleConfirmDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
    deleteUser(dispatch, id);
    setPopup({
      show: false,
      id: null,
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "firstName", headerName: "First Name", width: 145 },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 145,
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src="https://www.pngitem.com/pimgs/m/524-5246388_anonymous-user-hd-png-download.png"
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row._id}`}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline className="userListDelete" onClick={handleDelete} />

            {popup.show && (
              <div>
                <Dialog
                  open={popup.show}
                  onClose={handleCancelDelete}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"You want delete user?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Delete user
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button
                      onClick={() => handleConfirmDelete(params.row._id)}
                      autoFocus
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
