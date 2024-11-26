import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Toolbar, Button } from "@mui/material";
import PaymentFieldsTableDemo from "../components/PaymentFieldsTableDemo";
import OrderTableDemo from "../components/OrderTableDemo";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrder } from "../api/payosApi";
import Header from "../components/Header";
export default function Result() {
  const navigate = useNavigate();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  let orderCode = null;
  let paramsValue = new URLSearchParams(location.search);
  if (paramsValue.size === 0) {
    orderCode = location.state?.orderCode;
  }else{
    orderCode = paramsValue.get("orderCode")
  }

  useEffect(() => {
    if (orderCode !== null) {
      getOrder(orderCode)
        .then(data => {
          if (data.error == 0) {
            setOrder(data.data);
          } else if (data.error == -1) {
            toast.warning('Không tìm thấy đơn hàng');
          }
          setLoading(false);
        })
        .catch(error => {
          toast.error('Có lỗi xảy ra');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  
  return (
    <Box>
      <Header/>
      <ToastContainer />
      {loading ? (
        <LinearProgress />
      ) : (
        !order ?
        <Box sx={{ p: "30px" }}>
          <Typography variant="h6" sx={{textAlign: "center"}}>Không tìm thấy đơn hàng</Typography>
          <Box sx={{ marginTop: "20px", textAlign: "center"}}>
            <Button variant="contained" onClick={() => navigate("/") }>Trở về trang chủ</Button>
          </Box>
        </Box>
        :
        <Box sx={{ p: "30px" }}>
          {/* <OrderTableDemo data={order} /> */}
          <Box sx={{textAlign: "center"}}>
            {
              order?.status == "PAID" ? (
                <Typography variant="h6">Thanh toán thành công {order.product_id} - {order.status}</Typography>
              ) : (
                <Typography variant="h6">Thanh toán không thành công</Typography>
              )
            }
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="h6" sx={{textAlign: "center"}}>Thông tin khách hàng</Typography>
            <Box sx={{maxWidth: "500px", margin: "0 auto"}}>
              <Typography variant="body1">Họ tên: {order.fullname}</Typography>
              <Typography variant="body1">Email: {order.email}</Typography>
              <Typography variant="body1">Số điện thoại: {order.phone}</Typography>
              <Typography variant="body1">CCCD: {order.userId}</Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="body1" sx={{textAlign: "center"}}>Vé sẽ được chuyển vào mail của bạn trong vòng 1 ngày làm việc.</Typography>
          </Box>
          <Box sx={{ marginTop: "20px", textAlign: "center"}}>
            <Button variant="contained" onClick={() => navigate("/") }>Trở về trang chủ</Button>
          </Box>
          {/* <PaymentFieldsTableDemo data={order?.webhook_snapshot} /> */}
        </Box>
      )}
    </Box>
  );
}
