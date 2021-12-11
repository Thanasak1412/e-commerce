import styled from "styled-components";
import { useEffect, useState } from "react";

import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { publicRequest } from "../requestMethods.js";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    publicRequest
      .get("/categories")
      .then(({ data }) => setCategories(data.categories));
  }, []);

  return (
    <Container>
      {categories.map(({ _id, name, img, products }) => (
        <CategoryItem key={_id} name={name} img={img} products={products} />
      ))}
    </Container>
  );
};

export default Categories;
