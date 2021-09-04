import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";
import { fetchProduct } from "../../productSlice";
import { searchFilter } from "../../filterSlice";
import ProductsPage from "../Products";
import Banner from "../../../../components/Banner";
MainPage.propTypes = {};

function MainPage(props) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const onChangePagination = (event, value) => {
    event.preventDefault();
    const pagination = {
      ...filter,
      _limit: 12,
      _page: value,
    };
    const action = searchFilter(pagination);
    setPage(value);
    dispatch(action);
  };
  useEffect(() => {
    const fetchDataWithPagination = async () => {
      const products = await fetchProduct(filter);
      dispatch(products);
    };
    fetchDataWithPagination();
  }, [filter, dispatch]);
  const { allProduct, loading } = useSelector((state) => state.products);
  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div>
        <Banner />
        <ProductsPage products={allProduct} />
        <Pagination
          style={{
            borderRadius: "15px",
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
          }}
          page={page}
          color="primary"
          count={10}
          onChange={onChangePagination}
        />
      </div>
    );
  }
}

export default MainPage;
