import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
// import Chat from "./Chat/Chat";
import Header from "./Header/Header";
import History from "./History/History";
import Home from "./Home/Home";
import Menu from "./Menu/Menu";
import Products from "./Products/Products";
import Users from "./Users/Users";
import Login from "./Authentication/Login";
import NewProduct from "./New/NewProduct";
import UpdateProduct from "./Update/UpdateProduct";
import Update from "./Update/UpdateUser";
import Signup from "./Authentication/Signup";
import PrivateRoute from "./Private/PrivateRouter";
import Weather from "./Chart/Weather";
import TotalRevenue from "./Chart/TotalRevenue";
import DynamicBarChart from "./Chart/BestSeller/BestSeller";
import "./css/custom.css";

function App() {
  const { user, loading, error } = useContext(AuthContext);

  return (
    <div className="App">
      <div
        id="main-wrapper"
        data-theme="light"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-boxed-layout="full"
      >
        {user && (
          <>
            <Header />
            <Menu />
          </>
        )}

        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/weather" component={Weather} />
          <PrivateRoute path="/best-seller" component={DynamicBarChart} />
          <PrivateRoute path="/total-revenue" component={TotalRevenue} />
          <PrivateRoute path="/users/:userId" component={Update} />
          <PrivateRoute path="/users" component={Users} />
          <PrivateRoute path="/products/:productId" component={UpdateProduct} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/history" component={History} />
          <PrivateRoute path="/signup" component={Signup} />
          <PrivateRoute path="/new" component={NewProduct} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
