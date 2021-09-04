import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import AddEditProduct from "./AddProduct";
import ProDuctApi from "../../../../../api/productApi";

ProductCtrl.propTypes = {};
const useStyles = makeStyles({
  root: {
    fontSize: 12,
  },
  toolsbar: {
    height: 40,
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-end",
  },
  table: {
    minWidth: 650,
  },
  img: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  },
  btncontrol: {
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: "10px",
  },
});

function ProductCtrl(props) {
  const [allproduct, setAllproduct] = useState(null);
  useEffect(() => {
    try {
      const getAllProducts = async () => {
        const res = await ProDuctApi.getAll("");
        setAllproduct(res);
      };
      getAllProducts();
    } catch (error) {
      throw error;
    }
  }, []);
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const handleAddProduct = () => {
    setValuesDialog({
      name: "",
      description: "",
      price: "",
      countInStock: "",
    });
    setPreviewImg(null);
    setTypeSubmit("add");
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleEditProduct = async (values) => {
    setValuesDialog(values);
    setPreviewImg(values.imageUrl);
    setIndexEdit({
      _id: values._id,
      imageUrl: values.imageUrl,
    });
    setTypeSubmit("edit");
    setOpenDialog(true);
  };
  const [valuesDialog, setValuesDialog] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
  });
  const handleSubmitAddProduct = async (values, file) => {
    try {
      console.log({ values }, { file });
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("countInStock", values.countInStock);
      formData.append("price", values.price);
      formData.append("file", file);
      await ProDuctApi.addProducts(formData);
      const res = await ProDuctApi.getAll("");
      setPreviewImg(null);
      setAllproduct(res);
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const [indexEdit, setIndexEdit] = useState("");
  const handleSubmitEditProduct = async (values, file) => {
    console.log({ values }, { file });
    const formData = new FormData();
    if (!file) {
      formData.append("file", indexEdit.imageUrl);
    } else {
      formData.append("file", file);
    }
    formData.append("name", values.name);
    formData.append("_id", indexEdit._id);
    formData.append("description", values.description);
    formData.append("countInStock", values.countInStock);
    formData.append("price", values.price);
    await ProDuctApi.updateProduct(formData);
    const res = await ProDuctApi.getAll("");
    setPreviewImg(null);
    setAllproduct(res);
    setOpenDialog(false);
  };
  const handleDeleteProduct = async (value) => {
    try {
      await ProDuctApi.deleteProduct(value);
      const res = await ProDuctApi.getAll("");
      setAllproduct(res);
      console.log(res);
    } catch (error) {
      throw error;
    }
  };
  const [typeSubmit, setTypeSubmit] = useState("add");
  const [previewImg, setPreviewImg] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);
  const handleChangeInputImage = (event) => {
    setPreviewImg(URL.createObjectURL(event.target.files[0]));
    setImgUpload(event.target.files[0]);
  };
  if (!allproduct) {
    return <div>Loading......</div>;
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.toolsbar}>
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
          <AddEditProduct
            openDialog={openDialog}
            closeDialog={closeDialog}
            typeSubmit={typeSubmit}
            previewImg={previewImg}
            imgUpload={imgUpload}
            handleChangeInputImage={handleChangeInputImage}
            handleAddProduct={handleSubmitAddProduct}
            handleEditProduct={handleSubmitEditProduct}
            valueDialog={valuesDialog}
          />
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell size="small" align="left">
                  ID
                </TableCell>
                <TableCell size="small" align="left">
                  NAME
                </TableCell>
                <TableCell size="small" align="left">
                  Description
                </TableCell>
                <TableCell size="small" align="left">
                  Price
                </TableCell>
                <TableCell size="small" align="left">
                  Stock
                </TableCell>
                <TableCell size="small" align="left">
                  Image
                </TableCell>
                <TableCell size="small" align="left">
                  CONTROL
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allproduct.map((row) => (
                <TableRow key={row._id}>
                  <TableCell size="small" align="left">
                    {row._id}
                  </TableCell>
                  <TableCell size="small" align="left">
                    {row.name}
                  </TableCell>
                  <TableCell size="small" align="left">
                    {row.description}
                  </TableCell>
                  <TableCell size="small" align="left">
                    {row.price}
                  </TableCell>
                  <TableCell size="small" align="left">
                    {row.countInStock}
                  </TableCell>
                  <TableCell size="small" align="left">
                    <img
                      className={classes.img}
                      src={row.imageUrl}
                      alt={row.name}
                    />
                  </TableCell>
                  <TableCell
                    className={classes.btncontrol}
                    size="small"
                    align="left"
                  >
                    <div>
                      <Button
                        variant="outlined"
                        className={classes.btn}
                        onClick={() => handleEditProduct(row)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteProduct(row)}
                        className={classes.btn}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default ProductCtrl;
