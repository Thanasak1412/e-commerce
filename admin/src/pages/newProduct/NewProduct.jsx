import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import "./newProduct.css";
import app from "../../firebase";
import { addProduct, getBrands } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Alert, Stack } from "@mui/material";

const StyledAlert = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

export default function NewProduct() {
  const [productInput, setProductInput] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { brands, isFetching, isError } = useSelector((state) => state.brand);
  const [popup, setPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductInput((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    getBrands(dispatch);
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...productInput,
            img: downloadURL,
          };
          addProduct(dispatch, product);
          setPopup(true);

          setTimeout(() => {
            closePopup();
          }, 5000);
        });
      }
    );
  };

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Adidas SUPERSTAR"
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input
            name="size"
            type="text"
            placeholder="XL, 40"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input
            name="color"
            type="text"
            placeholder="Blue"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="$100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Quantity</label>
          <input
            name="quantity"
            type="text"
            placeholder="20"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Brand</label>
          <select name="brand" onChange={handleChange}>
            {brands.map(({ _id, name }) => (
              <option value={_id} key={_id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
        {popup && (
          <StyledAlert>
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">
                Product has been added successfully!
              </Alert>
            </Stack>
          </StyledAlert>
        )}
      </form>
    </div>
  );
}
