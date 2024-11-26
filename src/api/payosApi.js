import axios from "axios";

export async function createPaymentLink(formData) {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_ORDER_URL}/order/create`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function createOrder(formData) {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_ORDER_URL}/order/create-order-log`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateOrderSuccess(orderCode) {
  try {
    const res = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_ORDER_URL}/${orderCode}/success`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getListBank(){
    try {
        const res = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_LISTS_BANK_URL}`,
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
}
export async function getOrder(orderId){
  try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_ORDER_URL}/order/${orderId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
}
export async function cancelOrder(orderId){
  try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_ORDER_URL}/order/${orderId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
}

