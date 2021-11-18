import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "contexts/appContext";
import { ToastContext } from "contexts/toastContext";
import { Container } from "./styles";
import {
    Button,
    Paper,
    TextField,
} from "@material-ui/core";

function Page() {
    const store = useContext(AppContext);
    const toast = useContext(ToastContext);
    const [values, setValues] = useState({
        email: '',
        displayName: '',
        photoURL: '',
        phone: '',
    });

    const handleSubmit = async (evnt) => {
        evnt.preventDefault();
        const { displayName, photoURL, phone } = values;
        await store.handleUpdateProfile({ displayName, photoURL, phone });
        toast.success("Atualizado com sucesso!");
    }

    const handleChange = evnt => {
        if (!evnt || !evnt.target || evnt.target === null)
            return;

        setValues(values => ({ ...values, [evnt.target.name]: evnt.target.value }))
    }

    useEffect(() => {
        const { displayName, photoURL, phone, email } = store.profile || {};

        setValues({
            email: email ? email : '',
            displayName: displayName ? displayName : '',
            photoURL: photoURL ? photoURL : '',
            phone: phone ? phone : ''
        });
    }, [store.profile]);

    return (
        <Container>
            <Paper component="form" onSubmit={handleSubmit}>
                <div className="fields">
                    <TextField
                        disabled
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Nome"
                        name="displayName"
                        value={values.displayName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Telefone"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                    />
                    <TextField
                        label="URL Avatar"
                        name="photoURL"
                        value={values.photoURL}
                        onChange={handleChange}
                    />
                </div>
                <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                >
                    Atualizar
                </Button>
            </Paper>
        </Container>
    )
}
export default Page;