import axiosClient2 from "./axiosUser";
const ProDuctApi = {
  getAll: (params) => {
    const url = "/product";
    return axiosClient2.get(url, { params });
  },
  get: (id) => {
    const url = `/product/${id}`;
    return axiosClient2.get(url);
  },
  addProducts: (formData) => {
    const url = "/product";
    return axiosClient2.post(url, formData, {
      Headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteProduct: (value) => {
    const url = "/product/delete";
    return axiosClient2.post(url, value);
  },
  updateProduct: (formData) => {
    const url = "/product/update";
    return axiosClient2.post(url, formData, {
      Headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default ProDuctApi;
