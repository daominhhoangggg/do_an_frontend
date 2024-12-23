import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext"; // Import AuthContext

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, loading, error } = useContext(AuthContext); // Lấy thông tin người dùng từ context

  return (
    <Route
      {...rest}
      render={(props) =>
        !user && !loading ? ( // Nếu người dùng đã đăng nhập, hiển thị component
          <Redirect to="/login" /> // Nếu chưa đăng nhập, chuyển hướng đến trang login
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
