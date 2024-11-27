import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../api/productsApi";
// import imageAmoEvent from "../assets/events/amo-beauty-and-the-beast.png";
// import imageAmoLT8 from "../assets/events/amo-lt8.png";
// import imageAmoJT12 from "../assets/events/amo-jt12.png";
// import imageAmoJT13 from "../assets/events/amo-jt13.png";
import Header from "../components/Header";
import Carousel from "react-material-ui-carousel";
import moment from "moment";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content={`Mua Vé ${product?.name} - Muavepass.shop`} />
        <meta name="description" content={`Mua vé ${product?.name} ngay hôm nay tại Muavepass.shop! Sự kiện đặc biệt với các hạng vé đa dạng và quyền lợi hấp dẫn. Đặt vé dễ dàng, nhanh chóng và uy tín!`} />
        <meta name="keywords" content="fan meeting, Quang Hùng, vé concert, Muavepass.shop, mua vé nhanh, vé chính hãng, sự kiện âm nhạc, fan Quang Hùng" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Mua Vé ${product?.name} - Muavepass.shop`} />
        <meta property="og:description" content={`Mua vé ${product?.name} ngay hôm nay tại Muavepass.shop! Sự kiện đặc biệt với các hạng vé đa dạng và quyền lợi hấp dẫn. Đặt vé dễ dàng, nhanh chóng và uy tín!`} />
        <meta property="og:url" content="https://muavepass.shop" />
        <meta property="og:image" content={require(`../assets/events/${product?.image}`)} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Mua Vé ${product?.name} - Muavepass.shop`} />
        <meta name="twitter:description" content={`Mua vé ${product?.name} ngay hôm nay tại Muavepass.shop! Sự kiện đặc biệt với các hạng vé đa dạng và quyền lợi hấp dẫn. Đặt vé dễ dàng, nhanh chóng và uy tín!`} />
        <meta name="twitter:image" content={require(`../assets/events/${product?.image}`)} />
        
        {/* Favicon */}
        <link rel="icon" href={require(`../../public/logo-square.ico`)} type="image/x-icon" />
      </Helmet>
      <Header></Header>
      <Box sx={{ p: "30px" }}>
        <Typography variant="h4">{`${product?.product_name} (ghế: ${product?.seat})`}</Typography>
        <Box sx={{ display: "flex", gap: 2, marginTop: "30px", flexWrap: "wrap" }}>
          <Box sx={{ width: { xs: "100%", lg: "calc(50% - 10px)" } }}>
            <Carousel>
              {(product?.images || []).map((image, index) => {
                return (
                  <img
                    style={{
                      width: "100%",
                      height: "500px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      boxShadow:
                        "1px 4px 8px 1px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                    src={require(`../assets/events/${image}`)}
                    alt={`[HCM] Family show: "Beauty and the Beast" | THE UK PANTO`}
                  />
                );
              })}
            </Carousel>
          </Box>
          <Box sx={{ width: { xs: "100%", lg: "calc(50% - 10px)" }, display: "flex", flexDirection: "column", gap: 2, padding: "20px", border: "1px solid #ccc", borderRadius: "10px", height: "100%" }}>
            <Box>
              <Typography variant="body1">{`Hạng vé: ${product?.class}`}</Typography>
            </Box>
            <Box>
              <Typography variant="body1">{`Số ghế: ${product?.seat}`}</Typography>
            </Box>
            <Box>
              <Typography variant="body1">{`Thời gian: ${moment(product?.event_time).format("DD/MM/YYYY HH:mm")}`}</Typography>
            </Box>
            <Box>
              <Typography variant="body1">{`Địa điểm: ${product?.event_location}`}</Typography>
            </Box>
            <Box>
              <Typography variant="body1">{`Chủ vé: Võ Ngọc Quỳnh Mai - 0902550773 - vnqmai.hcmue@gmail.com`}</Typography>
            </Box>
            <Box>
              <Button variant="outlined" onClick={() => navigate(`/order/${product?._id}`)}>Mua ngay</Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer></Footer>
    </>
  );
};

export default ProductDetail;
