import React, { useEffect, useState } from "react";
import queryString from "query-string";
import ProductAPI from "../API/ProductAPI";
import Pagination from "./Component/Pagination";
import convertMoney from "../convertMoney";
import alertify from "alertifyjs";
import { useLocation, useHistory } from "react-router-dom";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [totalResult, setTotalResult] = useState(null);

  const location = useLocation();
  const history = useHistory();

  const [pagination, setPagination] = useState({
    page: "1",
    count: "8",
    search: "",
    category: "all",
  });

  const onChangeText = (e) => {
    const value = e.target.value;

    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: value,
      category: pagination.category,
    });
  };

  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = (value) => {
    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination({
      page: value,
      count: pagination.count,
      search: pagination.search,
      category: pagination.category,
    });
  };

  useEffect(() => {
    if (location.state?.success) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.success("Thêm sản phẩm thành công.");

      const timeout = setTimeout(() => {
        history.replace({
          ...location,
          state: { ...location.state, success: false },
        });
      }, 3000);

      // Cleanup timeout khi component unmount
      return () => clearTimeout(timeout);
    }
  }, [location, history]);

  //Gọi hàm
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: pagination.page,
        count: pagination.count,
        search: pagination.search,
        category: pagination.category,
      };

      const query = queryString.stringify(params);
      const newQuery = "?" + query;
      const response = await ProductAPI.getPagination(newQuery);

      //API trả về số sản phẩm của trang và tổng số sản phẩm
      setProducts(response.products);
      setTotalResult(response.totalResult);
    };

    fetchData();
  }, [pagination, totalResult]);

  const handleDelete = async (idProduct) => {
    try {
      await ProductAPI.deleteProduct(idProduct);
      const fetchData = async () => {
        const params = {
          page: pagination.page,
          count: pagination.count,
          search: pagination.search,
          category: pagination.category,
        };

        const query = queryString.stringify(params);
        const newQuery = "?" + query;
        const response = await ProductAPI.getPagination(newQuery);

        //API trả về số sản phẩm của trang và tổng số sản phẩm
        //Nếu sản phẩm bị xóa và không còn sản phẩm ở trang hiện tại thì chuyển về trang trước
        if (response.products.length === 0 && pagination.page > 1) {
          setPagination({
            ...pagination,
            page: `${parseInt(pagination.page) - 1}`,
          });
        } else {
          setProducts(response.products);
          if (totalResult > response.totalResult) {
            alertify.set("notifier", "position", "bottom-left");
            alertify.error("Xóa sản phẩm thành công.");
          }
          setTotalResult(response.totalResult);
        }
      };
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Basic Initialisation
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Home
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Tables
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Products</h4>
                <input
                  className="form-control w-25"
                  onChange={onChangeText}
                  type="text"
                  placeholder="Enter Search!"
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((value) => (
                          <tr key={value._id}>
                            <td>{value._id}</td>
                            <td>{value.name}</td>
                            <td>{convertMoney(value.price)}</td>
                            <td>
                              <img
                                src={value.img[0]}
                                style={{
                                  height: "60px",
                                  width: "60px",
                                }}
                                alt=""
                              />
                            </td>
                            <td>{value.category}</td>
                            <td>
                              <a
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-success"
                              >
                                Update
                              </a>
                              &nbsp;
                              <a
                                href="/products"
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-danger"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(value._id);
                                }}
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Pagination
                    pagination={pagination}
                    handlerChangePage={handlerChangePage}
                    totalResult={totalResult}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Products;
