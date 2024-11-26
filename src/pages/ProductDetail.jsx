import { Box, Button } from "@mui/material";
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
      <Header></Header>
      <Box sx={{ p: "30px" }}>
        <h1>{`[HCM] Family show: "Beauty and the Beast" | THE UK PANTO (seat: ${product?.seat})`}</h1>
        <Box sx={{ display: "flex", gap: 2, marginTop: "30px" }}>
          <Box sx={{ width: "50%" }}>
            <Carousel>
              {product?.images.map((image, index) => {
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
          <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>{`Hạng vé: ${product?.class}`}</Box>
            <Box>{`Số ghế: ${product?.seat}`}</Box>
            <Box>{`Thời gian: ${moment(product?.event_time).format("DD/MM/YYYY HH:mm")}`}</Box>
            <Box>{`Địa điểm: ${product?.event_location}`}</Box>
            <Box>
              {`Chủ vé: Võ Ngọc Quỳnh Mai - 0902550773 - vnqmai.hcmue@gmail.com`}
            </Box>
            <Box>
              <Button variant="outlined" onClick={() => navigate(`/order/${product?._id}`)}>Mua ngay</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetail;
