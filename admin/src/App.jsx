import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AuthContextProvider, getUserFromToken } from "./Context/AuthContext";
// import Chat from "./Chat/Chat";
import Header from "./Header/Header";
import History from "./History/History";
import Home from "./Home/Home";
import Menu from "./Menu/Menu";
import Products from "./Products/Products";
import Users from "./Users/Users";
import Login from "./Authentication/Login";
import NewProduct from "./New/NewProduct";
import Update from "./Update/UpdateUser";
import Signup from "./Authentication/Signup";
import PrivateRoute from "./Private/PrivateRouter";
import Weather from "./Chart/Weather/Weather";
import TotalRevenue from "./Chart/TotalRevenue/TotalRevenue";
import DynamicBarChart from "./Chart/BarChart/BarChart";
import "./css/custom.css";

function App() {
  const user = getUserFromToken();

  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
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
            {user?.fullname ? (
              <>
                <Header />
                <Menu />
              </>
            ) : (
              <Redirect to="/login" /> // Nếu chưa đăng nhập, chuyển hướng đến trang login
            )}

            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/users/:userId" component={Update} />
              <PrivateRoute path="/weather" component={Weather} />
              <PrivateRoute path="/best-seller" component={DynamicBarChart} />
              <PrivateRoute path="/total-revenue" component={TotalRevenue} />
              <PrivateRoute path="/users" component={Users} />
              <PrivateRoute path="/products" component={Products} />
              <PrivateRoute path="/history" component={History} />
              <PrivateRoute path="/signup" component={Signup} />
              <PrivateRoute path="/new" component={NewProduct} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
