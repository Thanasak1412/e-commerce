import styled from "styled-components";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { mobile } from "../responsive";
import { userRequest } from "../requestMethods";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const SubTitle = styled.p`
  font-size: 16px;
  text-decoration: underline;
  text-align: center;
  margin-bottom: 50px;
`;

const NotFound = styled.p`
  font-size: 48px;
  text-align: center;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
`;

const Details = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: "0px 20px" })}
`;

const ProductName = styled.span`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ProductId = styled.span`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ProductColor = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) => props.color === "White" && "1px solid #000"};
`;

const ProductSize = styled.span``;

const ProductPrice = styled.div`
  font-size: 25px;
  font-weight: 200;
`;

const Wishlist = () => {
  const [wishlist, setWishlist] = useState({});
  const history = useHistory();
  const userId = useSelector((state) => state.user.currentUser?.data.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const res = await userRequest.get("/wishlists");

        if (res.status === 200) {
          const { wishlists } = res.data;

          setWishlist(wishlists);
        }
      } catch {}
    };

    getWishlist();
  }, [dispatch, userId]);

  const handleClick = (id) => {
    history.push(`product/${id}`);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Wishlist</Title>
        <SubTitle>Your Wishlist({wishlist.length})</SubTitle>
        <Info>
          {wishlist.length > 0 ? (
            wishlist.map(
              ({ product: { _id, img, name, price, color, size } }) => (
                <Product key={_id}>
                  <ProductDetail>
                    <Image src={img} />
                    <Details>
                      <ProductName onClick={() => handleClick(_id)}>
                        <b>Product: </b>
                        {name}
                      </ProductName>
                      <ProductId onClick={() => handleClick(_id)}>
                        <b>ID: </b>
                        {_id}
                      </ProductId>
                      <ProductColor>Color: {color}</ProductColor>
                      <ProductSize>Size: {size}</ProductSize>
                      <ProductPrice>$ {price}</ProductPrice>
                    </Details>
                  </ProductDetail>
                </Product>
              )
            )
          ) : (
            <NotFound>Product Not Found</NotFound>
          )}
        </Info>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Wishlist;
