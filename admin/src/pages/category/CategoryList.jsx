import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import "./categoryList.css";
import { getCategories } from "../../redux/apiCalls";

export default function CategoryList() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "category",
      headerName: "Category",
      width: 120,
      renderCell: ({ row }) => {
        return (
          <div className="categoryListItem">
            <img className="categoryListImg" src={row.img} alt="" />
            {row.name}
          </div>
        );
      },
    },
    {
      field: "desc",
      headerName: "Description",
      width: 220,
    },
    {
      field: "products",
      headerName: "Product",
      width: 435,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <>
            <Link to={`/category/${row._id}`}>
              <button className="categoryListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="categoryListDelete"
              // onClick={() => handleDelete(row._id)}
            />

            {"popup".show && (
              <div>
                <Dialog
                  open={""}
                  onClose={""}
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
                    <Button>Cancel</Button>
                    <Button autoFocus>Delete</Button>
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
    <div className="categoryList">
      <DataGrid
        rows={categories.categories}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

// [
//   {
//     _id: "61af3b39d320d3d116da0943",
//     name: "Shoes",
//     img: "https://i.pinimg.com/600x315/83/10/27/8310272150b3f68855075c08319b5fde.jpg",
//     desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam fuga tempora earum beatae nemo fugiat, aliquid delectus dolorem odio repellendus! Aspernatur ipsam doloribus sequi, et laboriosam magnam tenetur nemo eos.",
//     isActive: true,
//     products: [
//       "61af2fe7d2da8b761725a92e",
//       "61af306d9a5366ba922d884e",
//       "61af30a89a5366ba922d8852",
//       "61af30cf9a5366ba922d8856",
//       "61af31569a5366ba922d8862",
//       "61af318a9a5366ba922d8866",
//     ],
//     createdAt: "2021-12-07T10:45:13.234Z",
//     updatedAt: "2021-12-07T10:45:13.234Z",
//     __v: 0,
//   },
//   {
//     _id: "61af3bdad320d3d116da0ffb",
//     name: "T-Shirt",
//     img: "https://i.pinimg.com/736x/d6/13/8a/d6138ac44ebf1af9d0e746d547a403c0.jpg",
//     desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam fuga tempora earum beatae nemo fugiat, aliquid delectus dolorem odio repellendus! Aspernatur ipsam doloribus sequi, et laboriosam magnam tenetur nemo eos.",
//     isActive: true,
//     products: [
//       "61a349560891bfc49e8815fb",
//       "61a3499e0891bfc49e881601",
//       "61af320f9a5366ba922d886a",
//       "61af32989a5366ba922d8870",
//       "61af32e89a5366ba922d8874",
//     ],
//     createdAt: "2021-12-07T10:47:54.045Z",
//     updatedAt: "2021-12-07T10:47:54.045Z",
//     __v: 0,
//   },
//   {
//     _id: "61af3d47d320d3d116da1ee0",
//     name: "Pants",
//     img: "https://media.istockphoto.com/photos/jeans-shelf-picture-id667074786?k=20&m=667074786&s=612x612&w=0&h=Bnmw1ZURq5G1z7l5ejnz0zhpiIgboG0vlyyc9vzwWxo=",
//     desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam fuga tempora earum beatae nemo fugiat, aliquid delectus dolorem odio repellendus! Aspernatur ipsam doloribus sequi, et laboriosam magnam tenetur nemo eos.",
//     isActive: true,
//     products: ["61af3d32d320d3d116da1e06"],
//     createdAt: "2021-12-07T10:53:59.126Z",
//     updatedAt: "2021-12-07T10:53:59.126Z",
//     __v: 0,
//   },
// ];
