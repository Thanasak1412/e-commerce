import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useHistory } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { addToCart } from "../redux/apiCalls";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
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
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) => props.color === "White" && "1px solid #000"};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.user?.currentUser?.data?._id);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const [cartItem, setCartItem] = useState(cart);
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const { data } = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, history, cart]);

  const handleClick = (product) => {
    history.push(`/product/${product}`);
  };

  const handleQuantity = (type, id) => {
    cartItem.products.map(({ savedCart }) => {
      const product = savedCart.products[0];
      if (type === "dec" && product._id === id) {
        addToCart(dispatch, userId, product._id, product.quantity - 1);
        return product.quantity - 1;
      } else {
        addToCart(dispatch, userId, product._id, product.quantity + 1);
        return product.quantity + 1;
      }
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cartItem.quantity})</TopText>
            <StyledLink to="/wishlist">
              <TopText>Your Wishlist</TopText>
            </StyledLink>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cartItem.products.map(
              ({ productDoc: product, savedCart: cart }, index) => (
                <Product key={index}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName onClick={() => handleClick(product._id)}>
                        <b>Product:</b> {product.name}
                      </ProductName>
                      <ProductId onClick={() => handleClick(product._id)}>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <ProductDetail>
                    <ProductAmountContainer>
                      <ProductAmount>
                        {cart.products.map(
                          ({ _id: id, quantity, totalPrice }) => (
                            <PriceDetail key={id}>
                              <ProductAmountContainer>
                                <Remove
                                  onClick={() =>
                                    handleQuantity("dec", id, quantity)
                                  }
                                />
                                <ProductAmount>{quantity}</ProductAmount>
                                <Add
                                  onClick={() =>
                                    handleQuantity("inc", id, quantity)
                                  }
                                />
                              </ProductAmountContainer>
                              <ProductPrice>$ {totalPrice}</ProductPrice>
                            </PriceDetail>
                          )
                        )}
                      </ProductAmount>
                    </ProductAmountContainer>
                  </ProductDetail>
                </Product>
              )
            )}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cartItem.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cartItem.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="test Shop"
              image="https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg"
              billingAddress
              shippingAddress
              description={`Your total is $${cartItem.totalPrice}`}
              amount={cartItem.totalPrice * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
