import { Box, CircularProgress, Backdrop, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { getListOfProducts } from "../api/productsApi";
import BannerSlider from "../components/BannerSlider";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getListOfProducts();
    setProducts(data);
  };
  return !products ? (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={!products}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Box
      component={"div"}
      className="flex flex-col !content-center flex-wrap gap-5"
    >
      <Header />
      <BannerSlider />

      <Grid container spacing={3} p={3}>
        {
          products.length > 0 &&
          products.map((product, index) => (
            <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} key={index} />
            </Grid>
          ))
        }
      </Grid>

      {/* <Box
        sx={{ padding: "30px", display: "flex", flexWrap: "wrap", gap: "30px" }}
      >
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </Box> */}
    </Box>
  );
}
