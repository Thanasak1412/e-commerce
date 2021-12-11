import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { mobile } from "../responsive";
import { useState } from "react";
import { register } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  outline: none;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  background-color: #008080;
  border: 2px solid #008080;
  font-weight: 600;
  padding: 12px 20px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    border: 2px solid #008080;
    color: #008080;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 15px;
  width: 100%;
  color: #000;
  font-size: 0.9em;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;

    setForm(() => {
      return {
        ...form,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(dispatch, form);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create a new account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name="firstName"
            placeholder="first name"
            autoFocus
            onChange={handleChange}
          />
          <Input
            name="lastName"
            placeholder="last name"
            onChange={handleChange}
          />
          <Input
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
          <Input name="email" placeholder="email" onChange={handleChange} />
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            onChange={handleChange}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
          <StyledLink to="/login">Already have an account?</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
