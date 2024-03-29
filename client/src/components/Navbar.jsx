import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signoutUser } from "../redux/userRedux";
import { clearCart } from "../redux/cartRedux";
import { clearWishlist } from "../redux/wishlistRedux";

const Container = styled.div`
  height: 60px;
  position: sticky;
  top: 0px;
  z-index: 10;
  background-color: #ffffff;
  border: 1px solid #ffe6e6;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 15px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const Button = styled.button`
  font-size: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignout = () => {
    dispatch(signoutUser());
    dispatch(clearCart());
    dispatch(clearWishlist());
    history.push("/login");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <StyledLink to="/">
            <Logo>TEST.</Logo>
          </StyledLink>
        </Center>
        <Right>
          <StyledLink to={currentUser ? "/cart" : "/login"}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </StyledLink>
          {!currentUser ? (
            <>
              <StyledLink to="/register">
                <MenuItem>REGISTER</MenuItem>
              </StyledLink>
              <StyledLink to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </StyledLink>
            </>
          ) : (
            <Button onClick={handleSignout}>
              <MenuItem>SIGN OUT</MenuItem>
            </Button>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
