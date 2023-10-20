import {
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../static/images/Logo";
import { useNavigate } from "react-router-dom";
import { createPaymentLink } from "../api/payosApi";
import Header from "../components/Header";

export default function DemoPayOS() {
  const colorMode = "light";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const productNameRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef(1000);
  const [currentTheme, setCurrentTheme] = useState(
    createTheme({
      palette: {
        mode: "light",
      },
    })
  );

  useEffect(() => {
    if (colorMode === "dark") {
      setCurrentTheme(
        createTheme({
          palette: {
            mode: "dark",
            background: {
              default: "#1b1b1d",
            },
          },
        })
      );
    } else {
      setCurrentTheme(
        createTheme({
          palette: {
            mode: "light",
          },
        })
      );
    }
  }, [colorMode]);

  const createPaymentLinkHandle = async function () {
    setLoading(true);
    const body = JSON.stringify({
      description: descriptionRef.current.value,
      productName: productNameRef.current.value,
      price: Number(priceRef.current.value),
      returnUrl: `${window.location.href}result/`,
      cancelUrl: `${window.location.href}result/`,
    });
    createPaymentLink(body)
      .then((data) => {
        if (data.error == 0) {
          const {
            accountName,
            accountNumber,
            amount,
            description,
            orderCode,
            qrCode,
            bin,
          } = data.data;
          navigate("/payment", {
            state: {
              accountName,
              accountNumber,
              amount,
              description,
              orderCode,
              qrCode,
              bin,
            },
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Có lỗi xảy ra");
      });
  };
  return (
    <ThemeProvider theme={currentTheme}>
      <Box
        component={"div"}
        className="flex flex-col !content-center flex-wrap gap-5"
      >
        <Header/>
        <Box
          component="div"
          className="w-3/4 md:w-1/2"
          sx={{ alignSelf: "center" }}
        >
          <ToastContainer />
          <Typography component="h4" variant="h4" className="!font-bold">
            Tạo mới đơn hàng
          </Typography>
          <Box component="div" sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <Typography>Tên sản phẩm:</Typography>
            <Box component="div" sx={{ width: "100%", marginTop: "10px" }}>
              <TextField
                id="outlined-basic"
                label="Nhập tên sản phẩm"
                variant="outlined"
                defaultValue="Mì tôm Hảo Hảo ly"
                inputRef={productNameRef}
                fullWidth
              />
            </Box>
          </Box>
          <Box component="div" sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <Typography>Đơn giá:</Typography>
            <Box component="div" sx={{ width: "100%", marginTop: "10px" }}>
              <TextField
                id="outlined-basic"
                label="Nhập đơn giá"
                variant="outlined"
                defaultValue="1000"
                inputRef={priceRef}
                fullWidth
              />
            </Box>
          </Box>
          <Box component="div" sx={{ marginBottom: "20px" }}>
            <Typography>Nội dung thanh toán:</Typography>
            <Box component="div" sx={{ width: "100%", marginTop: "10px" }}>
              <TextField
                id="outlined-basic"
                label="Nhập nội dung"
                variant="outlined"
                defaultValue="Thanh toan don hang"
                inputRef={descriptionRef}
                fullWidth
              />
            </Box>
          </Box>
          <Box component="div">
            <Button
              variant="contained"
              onClick={createPaymentLinkHandle}
              disabled={loading}
              className="!bg-[#5D5FEF] !normal-case"
            >
              Đến trang thanh toán
              {loading ? (
                <>
                  {" "}
                  &nbsp; <CircularProgress className="!text-white" size={20} />
                </>
              ) : (
                ""
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
