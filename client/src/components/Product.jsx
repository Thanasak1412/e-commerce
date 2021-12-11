import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { addToCart, addWishlist } from "../redux/apiCalls";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ product }) => {
  const userId = useSelector((state) => state.user?.currentUser?.data?._id);
  const dispatch = useDispatch();
  const history = useHistory();
  const productId = product._id;

  const handleClick = () => {
    const quantity = 1;

    userId
      ? addToCart(dispatch, userId, productId, quantity)
      : history.push("/login");
  };

  const handleWishlist = () => {
    const isLiked = true;

    userId
      ? addWishlist(dispatch, userId, productId, isLiked)
      : history.push("/login");
  };

  return (
    <Container>
      <Circle />
      <Image src={product.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={handleClick} />
        </Icon>
        <Icon>
          <Link to={`/product/${product._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined onClick={handleWishlist} />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
