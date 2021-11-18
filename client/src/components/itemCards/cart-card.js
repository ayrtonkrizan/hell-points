import React, { useState, useEffect, useContext } from "react";
import { storage } from "firebase-folder"
import {
    CardActions,
    CardMedia,
    Typography,
    Divider,
    IconButton
} from "@material-ui/core";

import {
    CartCard as Card
} from "./styles";

import {
    Add as PlusIcon,
    Remove as RemoveIcon,
} from "@material-ui/icons";

import { AppContext } from "contexts/appContext";

import helpers from "services/helpers"

function Componenet({ initialData }) {
    const store = useContext(AppContext);
    const [values, setValues] = useState({ description: '', plu: '', imageUrl: '', quantity: 0, favorite: false });

    useEffect(() => {
        const getImage = async () => {
            let imageUrl = initialData.imageUrl;
            try {
                if (!imageUrl) {
                    let url = '';
                    if (initialData.ean)
                        url = `produtos-img-400x400/${initialData.ean}.png`
                    else
                        url = `produtos-img-400x400/${initialData.plu}.png`
                    imageUrl = await storage.storageRef().child(url).getDownloadURL();
                }
            }
            catch (err) {
                imageUrl = '/product-placeholder.jpg';
            }
            finally {
                setValues({ ...initialData, imageUrl })
            }
        }
        getImage();
    }, [initialData]);
    return (
        <Card>
            <CardMedia
                className="media"
                title={`foto ${values.description}`}
                image={values.imageUrl}
            />
            <div className="content">
                <Typography variant="body2" className="description" align="center">{values.description}</Typography>
                <Typography variant="body2" color="primary" align="center">{helpers.maskedMoney(values.price)}</Typography>
            </div>
            <Divider className="divider" orientation="vertical" />
            <CardActions className="actions">
                <IconButton color="primary" onClick={() => store.handleAddItemCart(values)}>
                    <PlusIcon fontSize="small" />
                </IconButton>
                <Typography color="primary" variant="h6" component="h5">{(store.cart[values.plu] || { quantity: 0 }).quantity}</Typography>
                <IconButton color="primary" onClick={() => store.handleRemoveItemCart(values)}>
                    <RemoveIcon fontSize="small" />
                </IconButton>
            </CardActions>
        </Card>
    )
}
export default Componenet;