import React, { useState, useEffect, useContext } from "react";
import { storage, db } from "firebase-folder"
import {
    CardActions,
    CardMedia,
    Typography,
    Divider,
    IconButton
} from "@material-ui/core";

import {
    Card
} from "./styles";

import {
    Add as PlusIcon,
    Remove as RemoveIcon,
    FavoriteBorder as FavNoIcon,
    Favorite as FavYesIcon,
} from "@material-ui/icons";

import { AppContext } from "contexts/appContext";

import helpers from "services/helpers"

function Componenet({ initialData, onFavoriteChange }) {
    const store = useContext(AppContext);
    const [values, setValues] = useState({ description: '', plu: '', imageUrl: '', favorite: false, price: 10, factor: 1 });
    const Icon = values.favorite ? FavYesIcon : FavNoIcon;

    const handleFavorite = async () => {
        let favorite = !values.favorite;
        try {
            if (store.profile.email)
                await db.toggleUserFavoriteItem({ userId: store.profile.email, itemId: values.plu, favorite });
            setValues({ ...values, favorite });
            if(onFavoriteChange)
                onFavoriteChange(favorite);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const getImage = async () => {
            let imageUrl = ''
            try {
                let url = '';
                if (initialData.ean)
                    url = `produtos-img-400x400/${initialData.ean}.png`
                else
                    url = `produtos-img-400x400/${initialData.plu}.png`
                imageUrl = await storage.storageRef().child(url).getDownloadURL();
            }
            catch (err) {
                imageUrl = '/product-placeholder.jpg';
            }
            finally {
                setValues({ ...initialData, favorite: store.profile.items[initialData.plu], imageUrl })
            }
        }
        getImage();
    }, [initialData, store.profile.items]);

    return (
        <Card>
            <IconButton className="favorite-icon" onClick={handleFavorite}>
                <Icon color="primary" />
            </IconButton>
            <CardMedia
                className="media"
                title={`foto ${values.description}`}
                image={values.imageUrl}
            />
            <Typography variant="body2" className="description" align="center">{values.description}</Typography>
            <Typography variant="body2" color="primary" align="center">{helpers.maskedMoney(values.price)}</Typography>
            <Divider className="divider" />
            <CardActions className="actions">
                <IconButton color="primary" onClick={() => store.handleRemoveItemCart(values)}>
                    <RemoveIcon />
                </IconButton>
                <Typography color="primary" variant="h5">{(store.cart[values.plu] || { quantity: 0 }).quantity}</Typography>
                <IconButton color="primary" onClick={() => store.handleAddItemCart(values)}>
                    <PlusIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}
export default Componenet;