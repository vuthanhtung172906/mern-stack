import axiosClient2 from "./axiosUser";

const UserApi = {
  login: (data) => {
    const url = "/user/login";
    return axiosClient2.post(url, data);
  },
  getAccessToken: () => {
    const url = "/user/refresh_token";
    return axiosClient2.post(url, null);
  },
  register: (data) => {
    const url = "/user/register";
    return axiosClient2.post(url, data);
  },
  activation: (data) => {
    const url = "/user/activation";
    return axiosClient2.post(url, data);
  },
  forgotPass: (data) => {
    const url = "/user/forgot";
    return axiosClient2.post(url, data);
  },
  resetPass: (password, token) => {
    const url = "/user/reset";
    return axiosClient2.post(url, password, {
      headers: {
        Authorization: token,
      },
    });
  },
  getUser: (token) => {
    const url = "/user/infor";

    return axiosClient2.get(url, {
      headers: {
        Authorization: token,
      },
    });
  },
  logout: () => {
    const url = "/user/logout";
    return axiosClient2.post(url);
  },
  updateAddress: (newAddress, token) => {
    const url = "/user/update_address";
    return axiosClient2.patch(url, newAddress, {
      headers: {
        Authorization: token,
      },
    });
  },
  changePass: (newpass, token) => {
    const url = "/user/change_password";
    return axiosClient2.patch(url, newpass, {
      headers: {
        Authorization: token,
      },
    });
  },
  getAllUsers: (token) => {
    const url = "/user/get_all_users";
    return axiosClient2.get(url, {
      headers: {
        Authorization: token,
      },
    });
  },
  addCart: (cart, token) => {
    const url = "/user/add_to_cart";
    return axiosClient2.patch(
      url,
      { cart: cart },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },
  requestPayment: (total, address, cart, typePay, token) => {
    const url = "/payment/request";
    return axiosClient2.post(
      url,
      {
        total,
        address,
        cart,
        typePay,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },
  editStatus: (paymentID, status, token) => {
    const url = "/payment/status";
    return axiosClient2.patch(
      url,
      {
        paymentID,
        status,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },
  getOrderHistory: (token) => {
    const url = "/payment/order_history";
    return axiosClient2.get(url, {
      headers: {
        Authorization: token,
      },
    });
  },
  getAllOrder: (token) => {
    const url = "/payment/getAllOrder";
    return axiosClient2.get(url, {
      headers: {
        Authorization: token,
      },
    });
  },
  createPayPaid: (total, address, cart, typePay, token) => {
    const url = "/payment/createPayPaid";
    return axiosClient2.post(
      url,
      {
        total,
        address,
        cart,
        typePay,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },
};

export default UserApi;
