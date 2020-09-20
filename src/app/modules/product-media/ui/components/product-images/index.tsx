import React, { useEffect, useState } from "react";
import { ProductImage } from "app/modules/product-media/domain/interfaces/ProductImage";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";

type Props = {
    images: ProductImage[]
}
const useStyles = makeStyles(theme => ({
    media: {
        height: 150,
        borderRadius: "12px",
        margin: "0"
    },
}));

const ProductImages = (props: Props) => {
    const { images } = props
    const [error, setError] = useState(null);
    const [binaryData, setBinaryData] = useState(null);

    const classes = useStyles();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    };

    function get_image(image_name: string) {
        let photoURL = 'https://farmer4u.herokuapp.com/media/' + image_name;
        fetch(photoURL, requestOptions)
            .then(async response => {
                response.blob().then(blob => {
                    // setIsLoaded(true);
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (blob) || response.status;
                        return Promise.reject(error);
                    }

                    const fileReaderInstance = new FileReader();
                    fileReaderInstance.readAsDataURL(blob);
                    fileReaderInstance.onload = () => {
                        setBinaryData(fileReaderInstance.result);
                    }
                })
            })
            .catch(error => {
                setError(error);
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        // images.forEach(image => setBinaryData(get_image(image.name)));
        if (images && images.length > 0) {
            get_image(images[0].name);
        }
    });
    if (error) {
        return (
            <CardMedia
                className={classes.media}
            >
                <div>Ошибка: {error.message}</div>
            </CardMedia>
        );
    } else return (
        <CardMedia
            className={classes.media}
            image={binaryData}
        >
            {/*{!isLoaded ? (<Loader*/}
            {/*    type="ThreeDots"*/}
            {/*    color="primary"*/}
            {/*    height={100}*/}
            {/*    width={100}*/}
            {/*    timeout={3000}//3 secs*/}
            {/*    />) : (<div>done</div>)*/}
            {/*}*/}
        </CardMedia>
    )
};

export default ProductImages;
