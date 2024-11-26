import axios from "axios";

export async function getListOfProducts() {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_ORDER_URL}/product/list`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  } catch (error) {
    return [];
  }
}

export async function getProductDetail(id) {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_ORDER_URL}/product/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  } catch (error) {
    return [];
  }
}
