import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../../../../components/InputField";

AddEditProduct.propTypes = {
  handleAddProduct: PropTypes.func,
  handleEditProduct: PropTypes.func,
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  typeSubmit: PropTypes.string,
  valueDialog: PropTypes.object.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  previewImgProduct: {
    width: "100%",
    height: 600,
    background: "url(../assets/piqturdrophere.jpg)",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative",
  },
  previewImgProduct__img: {
    margin: "auto",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 20,
  },
  previewImgProduct_input: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
}));
AddEditProduct.defaultProps = {
  typeSubmit: "add",
};

function AddEditProduct(props) {
  const classes = useStyles();
  const {
    handleAddProduct,
    handleEditProduct,
    openDialog,
    closeDialog,
    typeSubmit,
    valueDialog,
    previewImg,
    imgUpload,
    handleChangeInputImage,
  } = props;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Enter product name"),
    description: Yup.string().required("Enter product description"),
    price: Yup.string().required("Enter product price"),
    countInStock: Yup.number().required("Enter product in stock"),
  });

  const onSubmitAdd = async (values) => {
    await handleAddProduct(values, imgUpload);
  };
  const onSubmitEdit = async (values) => {
    await handleEditProduct(values, imgUpload);
  };
  return (
    <Dialog onClose={closeDialog} open={openDialog} className={classes.root}>
      <DialogTitle>New Product</DialogTitle>
      <DialogContent>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: valueDialog.name,
            description: valueDialog.description,
            price: valueDialog.price,
            countInStock: valueDialog.countInStock,
          }}
          onSubmit={(values) =>
            typeSubmit === "add" ? onSubmitAdd(values) : onSubmitEdit(values)
          }
        >
          {(formikProps) => {
            return (
              <Form>
                <div className={classes.previewImgProduct}>
                  <img
                    src={previewImg ? previewImg : valueDialog.imageUrl}
                    alt=""
                    className={classes.previewImgProduct__img}
                  />
                  <input
                    type="file"
                    name="file"
                    onChange={handleChangeInputImage}
                    className={classes.previewImgProduct_input}
                  />
                </div>
                <FastField
                  name="name"
                  label="Name of Product"
                  displayProps={true}
                  component={InputField}
                  type="text"
                  variant="outlined"
                />
                <FastField
                  name="description"
                  label="Description of Product"
                  displayProps={true}
                  component={InputField}
                  type="text"
                  variant="outlined"
                />{" "}
                <FastField
                  name="price"
                  label="Price of Product"
                  displayProps={true}
                  component={InputField}
                  type="text"
                  variant="outlined"
                />
                <FastField
                  name="countInStock"
                  label="Product in stock"
                  displayProps={true}
                  component={InputField}
                  type="number"
                  variant="outlined"
                />
                <Button type="submit">Submit</Button>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddEditProduct;
