import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #008080;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: #008000;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const StyledLink = styled(Link)`
  color: #000;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    if (currentUser) {
      history.push("/");
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>LOG IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            Log In
          </Button>
          {error && <Error>Something Went Wrong...</Error>}
          <StyledLink to="/reset-password">Forgotten password?</StyledLink>
          <StyledLink to="/register">Create a new account?</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
