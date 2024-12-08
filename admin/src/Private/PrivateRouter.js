import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUserFromToken } from "../Context/AuthContext"; // Import AuthContext

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = getUserFromToken(); // Lấy thông tin người dùng từ context
    return (
        <Route
            {...rest}
            render={(props) =>
                user?.fullname ? ( // Nếu người dùng đã đăng nhập, hiển thị component
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" /> // Nếu chưa đăng nhập, chuyển hướng đến trang login
                )
            }
        />
    );
};

export default PrivateRoute;
