import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "../products-form";
import { Product } from "app/modules/products/domain/interfaces/Product";
import UDErrorMessage from "app/modules/ud-forms/error-message/input";
import { reduxForm } from "redux-form";

export const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(3),
        borderRadius: "5px",
        padding: "30px",
    },
    description: {
        width: 600,
        margin: theme.spacing(3),
    },
    main: {
        width: 300,
        margin: theme.spacing(3),
    },
    button: {
        margin: "10px",
        padding: "5px",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
}));

const NewProductReduxForm = reduxForm<Product>({
    form: 'new_product'
})(ProductForm)


const NewProduct = () => {
    const dispatch = useDispatch();
    // const error = useSelector(productsNewErrorSelector)

    const onSubmit = (formData: Product) => {
        // dispatch(createProduct(formData))
    }

    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Paper className={classes.paper} elevation={3}>
                <h1>
                    Новый товар
                </h1>
                {/* {error && <UDErrorMessage error={error?.message} />} */}
                <NewProductReduxForm onSubmit={onSubmit} />
            </Paper>
        </Grid>
    )
};
export default NewProduct