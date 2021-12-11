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

import "./productList.css";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [popup, setPopup] = useState({
    show: false,
    id: null,
  });

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

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
    deleteProduct(dispatch, id);
    setPopup({
      show: false,
      id: null,
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Stock",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />

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
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
