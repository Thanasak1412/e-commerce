import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Category from "./pages/category/CategoryList";

function App() {
  const admin = useSelector((state) => state.user.currentUser?.data.role);
  const isAdmin = admin === "ADMIN";

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {isAdmin ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newProduct">
                <NewProduct />
              </Route>
              <Route path="/categories">
                <Category />
              </Route>
            </div>
          </>
        ) : (
          <>
            <Redirect to="/login" />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
