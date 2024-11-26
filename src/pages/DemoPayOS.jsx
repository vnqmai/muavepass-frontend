import {
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrder, createPaymentLink } from "../api/payosApi";
import Header from "../components/Header";
import { getProductDetail } from "../api/productsApi";
import { useParams } from "react-router-dom";
import useScript from "react-script-hook";
import ProductCard from "../components/ProductCard";

export default function DemoPayOS() {
  const [openDialogLoading, setOpenDialogLoading] = useState(false);
  const userNameRef = useRef("");
  const userEmailRef = useRef("");
  const userPhoneRef = useRef("");

  const [loading, error] = useScript({
    src: process.env.REACT_APP_PAYOS_SCRIPT,
    checkForExisting: true,
  });
  const RETURN_URL = `${window.location.origin}/result/`;
  const CANCEL_URL = `${window.location.origin}/result/`;

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductDetail(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  const createPaymentLinkHandle = async function (
    callbackFunction,
    setLoading
  ) {
    setLoading(true);
    try {
      const body = JSON.stringify({
        user: {
          name: userNameRef.current.value,
          email: userEmailRef.current.value,
          phone: userPhoneRef.current.value,
        },
        productId: product._id,
        price: product.price,
        amount: product.price,
        description: product.product_id,
        productName: product.product_name,
        returnUrl: RETURN_URL,
        cancelUrl: CANCEL_URL,
      });
      let response = await createPaymentLink(body);
      if (response.error != 0) throw new Error("Call Api failed: ");
      let order = await createOrder({
        orderCode: response.data.orderCode,
        productId: product._id,
        userName: userNameRef.current.value,
        userEmail: userEmailRef.current.value,
        userPhone: userPhoneRef.current.value,
      });
      if (order.error != 0) throw new Error("Call Api failed: create order log");
      callbackFunction(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Có lỗi xảy ra");
    }
  };
  const openPaymentDialog = async function (checkoutResponse) {
    if (checkoutResponse) {
      let url = checkoutResponse.checkoutUrl;
      let { open } = window.PayOSCheckout.usePayOS({
        RETURN_URL: RETURN_URL,
        ELEMENT_ID: "config_root",
        CHECKOUT_URL: url,
        onExit: (eventData) => {
          console.log(eventData);
        },
        onSuccess: (eventData) => {
          console.log(eventData);
          window.location.href = `${RETURN_URL}?orderCode=${eventData.orderCode}`;
        },
        onCancel: (eventData) => {
          console.log(eventData);
          window.location.href = `${CANCEL_URL}?orderCode=${eventData.orderCode}`;
        },
      });
      open();
    }
  };
  return !product || loading ? (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={!product || loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Box
      component={"div"}
      className="flex flex-col !content-center flex-wrap gap-5"
    >
      <Header />
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
          <Typography>Họ và tên:</Typography>
          <Box component="div" sx={{ width: "100%", marginTop: "10px" }}>
            <TextField
              id="outlined-basic"
              label="Nhập họ tên"
              variant="outlined"
              defaultValue=""
              inputRef={userNameRef}
              fullWidth
            />
          </Box>
        </Box>
        <Box component="div" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          <Typography>Email:</Typography>
          <Box component="div" sx={{ width: "100%", marginTop: "10px" }}>
            <TextField
              id="outlined-basic"
              label="Nhập email"
              variant="outlined"
              defaultValue=""
              inputRef={userEmailRef}
              fullWidth
            />
          </Box>
        </Box>
        <Box component="div" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          <Typography>Số điện thoại:</Typography>
          <Box component="div" sx={{ width: "100%", marginTop: "10px" }}>
            <TextField
              id="outlined-basic"
              label="Nhập số điện thoại"
              variant="outlined"
              defaultValue=""
              inputRef={userPhoneRef}
              fullWidth
            />
          </Box>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            marginBottom: "20px",
          }}
        >
          <ProductCard product={product} hideBuyNow />
        </Box>
        <Box component="div" className="flex flex-col gap-3 items-center">
          <Button
            variant="contained"
            onClick={() =>
              createPaymentLinkHandle(openPaymentDialog, setOpenDialogLoading)
            }
            disabled={openDialogLoading}
            className="!bg-[#26ce86] !normal-case"
          >
            Thanh toán
            {openDialogLoading ? (
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
  );
}
