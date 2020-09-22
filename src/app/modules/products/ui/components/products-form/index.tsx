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
import { Field, InjectedFormProps } from "redux-form";
import UDFormsLabel from "app/modules/ud-forms/label";
import { Product } from "app/modules/products/domain/interfaces/Product";
import UDInput from "app/modules/ud-forms/form-input/input";
import { required, maxLengthCreator } from "app/modules/validation/common-validator";
import { CategoriesEnum } from "app/modules/products/domain/enums/CategoriesEnum";
import { useCategoryTranslate } from "app/modules/products/domain/hooks/useCategoryTranslate";
import UDMaterialSelect from "app/modules/ud-forms/material-select/select";

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

const maxLength100 = maxLengthCreator(100)
const categories = Object.values(CategoriesEnum).map(value => ({ value: value, label: useCategoryTranslate(value) }))

const ProductForm: React.FC<InjectedFormProps<Product>> = ({ handleSubmit, error, pristine, submitting, invalid, form }) => {
    const classes = useStyles();
    const history = useHistory();
    const [type, setType] = useState("");

    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     const productData = new FormData(event.target);
    //     const object = {};
    //     productData.forEach((value, key) => {
    //         object[key] = value
    //     });

    //     object["count"] = parseInt(object["count"]);
    //     const json = JSON.stringify(object);
    //     console.log(json);


    //     const url = API_URL + "/products";

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Accept': 'application/json',
    //             'Authorization': 'Bearer ' + cookies.auth_token
    //         },
    //         body: json
    //     };
    //     fetch(url, requestOptions, [])
    //         .then(async response => {
    //             const data = await response.json();

    //             // check for error response
    //             if (!response.ok) {
    //                 // get error message from body or default to response status
    //                 const error = (data && data.message) || response.status;
    //                 return Promise.reject(error);
    //             }

    //             history.push('/product/' + data.id.toString())
    //         })
    //         .catch(error => {
    //             // setState({ errorMessage: error });
    //             console.error('There was an error!', error);
    //         });
    //     }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    className={classes.main}
                >
                    <Field component={UDInput}
                        validate={[required, maxLength100]}
                        placeholder="Название"
                        name={"title"}
                        className="mt-2"
                    />
                    <Field component={UDInput}
                        validate={[required, maxLength100]}
                        placeholder="Количество"
                        name={"count"}
                        className="mt-2"
                    />
                    <Field component={UDMaterialSelect}
                        validate={[required]}
                        options={categories}
                        name={"category"}
                        className="mt-2"
                    />

                    <FormControl
                        variant="outlined"
                        required
                        className={classes.formControl}
                    >
                        <InputLabel id="typeLabel">Тип</InputLabel>
                        <Select
                            labelId="typeLabel"
                            id="countType"
                            name="countType"
                            label="Тип"
                        // onChange={(event) => {
                        //     setType(event.target.value);
                        // }}
                        >
                            <MenuItem value="KILOGRAM">Килограмм</MenuItem>
                            <MenuItem value="ITEM">Шт.</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        fullWidth
                    // className={classes.formControl}
                    >
                        <InputLabel id="categoryLabel">Категория</InputLabel>
                        <Select
                            labelId="categoryLabel"
                            id="category"
                            // value={category}
                            name="category"
                            label="Категория"
                        // onChange={(event) => {
                        //     setCategory(event.target.value);
                        // }}
                        >
                            <MenuItem value="">Нет</MenuItem>
                            {categories.map((option, index) =>
                                <MenuItem key={index} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        id="cost"
                        label="Цена"
                        name="cost"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                ₽ {type === "KILOGRAM" ? ("за кг") : ("за шт.")}
                            </InputAdornment>,
                        }}
                        className={classes.formControl}
                    />
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.description}
                >
                    <TextField
                        id="description"
                        name="description"
                        label="Описание"
                        multiline
                        rows={8}
                        fullWidth
                        variant="outlined"
                        className={classes.formControl}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Готово
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
};
export default ProductForm