import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { userRequest } from "../../requestMethods";
import "./product.css";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [productInput, setProductInput] = useState({});
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(`/orders/income`);
        const { orderIncome } = res.data;

        const list = orderIncome.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductInput((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProduct(dispatch, product._id, productInput);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.name}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">In Stock:</span>
              <span className="productInfoValue">{product.quantity}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              placeholder={product.name}
              name="productName"
              onChange={handleChange}
            />
            <label htmlFor="productDesc">Product Description</label>
            <input
              type="text"
              placeholder={product.desc}
              name="productDesc"
              onChange={handleChange}
            />
            <label htmlFor="productPrice">Price</label>
            <input
              type="text"
              placeholder={product.price}
              name="productPrice"
              onChange={handleChange}
            />
            <label htmlFor="productIsActive">Is Active</label>
            <select name="productIsActive" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
