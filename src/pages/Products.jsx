import { Box, CircularProgress, Backdrop, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { getListOfProducts } from "../api/productsApi";
import BannerSlider from "../components/BannerSlider";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getListOfProducts();
    setProducts(data);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content={`Mua Vé fan meeting Quang Hùng Day 3 - Muavepass.shop`} />
        <meta name="description" content={`Mua vé fan meeting Quang Hùng Day 3 ngay hôm nay tại Muavepass.shop! Sự kiện đặc biệt với các hạng vé đa dạng và quyền lợi hấp dẫn. Đặt vé dễ dàng, nhanh chóng và uy tín!`} />
        <meta name="keywords" content="fan meeting, Quang Hùng, vé concert, Muavepass.shop, mua vé nhanh, vé chính hãng, sự kiện âm nhạc, fan Quang Hùng" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Mua Vé fan meeting Quang Hùng Day 3 - Muavepass.shop`} />
        <meta property="og:description" content={`Mua vé fan meeting Quang Hùng Day 3 ngay hôm nay tại Muavepass.shop! Sự kiện đặc biệt với các hạng vé đa dạng và quyền lợi hấp dẫn. Đặt vé dễ dàng, nhanh chóng và uy tín!`} />
        <meta property="og:url" content="https://muavepass.shop" />
        <meta property="og:image" content={"/fmt.png"} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Mua Vé fan meeting Quang Hùng Day 3 - Muavepass.shop`} />
        <meta name="twitter:description" content={`Mua vé fan meeting Quang Hùng Day 3 ngay hôm nay tại Muavepass.shop! Sự kiện đặc biệt với các hạng vé đa dạng và quyền lợi hấp dẫn. Đặt vé dễ dàng, nhanh chóng và uy tín!`} />
        <meta name="twitter:image" content={"/fmt.png"} />
      </Helmet>
      {!products ? (
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
            {products.length > 0 &&
              products.map((product, index) => (
                <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} key={index} />
                </Grid>
              ))}
          </Grid>

          <Footer />
        </Box>
      )}
    </>
  );
}
