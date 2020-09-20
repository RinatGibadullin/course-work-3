import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import * as QueryString from "query-string";
import { CategoriesEnum } from "app/modules/products/domain/enums/CategoriesEnum";
import { useCategoryTranslate } from "app/modules/products/domain/hooks/useCategoryTranslate";
import { StyledFilterCard } from "./styles";
import UDButton from "app/modules/ud-ui/button/button";

// const useStyles = makeStyles(theme => ({
//     filter: {
//         padding: '30px',
//         margin: '20px',
//         backgroundColor: theme.palette.primary.light
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 150,
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 0),
//         backgroundColor: theme.palette.primary.main,
//         padding: "5px",
//         color: "white"
//     },
// }));

// function valuetext(value) {
//     return `${value}°C`;
// }

const categories = Object.values(CategoriesEnum).map(value => ({ value: value, label: useCategoryTranslate(value) }))

const ProductsFilter = () => {
    const history = useHistory();

    const [price, setPrice] = useState([0, 10000]);
    const [category, setCategory] = useState("");
    const [isLoaded, setIsLoaded] = useState();
    const [isFiltered, setIsFiltered] = useState();

    async function handleSubmit(event: any) {
        // event.preventDefault();
        // const productData = new FormData(event.target);
        // const object = {};
        // productData.forEach((key, value) => {
        //     object[value] = key
        // });
        // // console.log(object);

        // const category = object["category"];
        // console.log(category);
        // const values = QueryString.parse(window.location.search);
        // values["category"] = category;
        // const query = QueryString.stringify(values);

        // setIsFiltered(true);
        // setIsLoaded(true);
        // filterState(isFiltered);
        // loadedState(isLoaded);

        // history.push("/products?" + query);
    }

    return (
        <StyledFilterCard>
            <h3>Фильтры</h3>
            <form
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    {/* <Typography id="range-slider" gutterBottom>
                        Цена
                    </Typography>
                    <Slider
                        value={price}
                        onChange={handleChangePrice}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                    /> */}
                    <br />

                    <FormControl
                        variant="outlined"
                        fullWidth
                        // className={classes.formControl}
                    >
                        <InputLabel id="categoryLabel">Категория</InputLabel>
                        <Select
                            labelId="categoryLabel"
                            id="category"
                            value={category}
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
                    <UDButton
                        label="Применить"
                        // type="submit"
                    />
                </Grid>
            </form>
        </StyledFilterCard>
    )
};

export default ProductsFilter;