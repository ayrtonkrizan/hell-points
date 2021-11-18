import React, { useState, useContext } from "react";
import { auth } from "firebase-folder";
import { Container } from "./styles";
import {
    Button,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import { ToastContext } from "contexts/toastContext";

const DEFAULT_VALUES = {
    email: '',
}

function Page({ close }) {
    const [values, setValues] = useState(DEFAULT_VALUES);
    const toast = useContext(ToastContext);

    const handleChange = evnt => {
        if (!evnt || !evnt.target) return;
        const { value, name } = evnt.target
        setValues(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (evnt) => {
        evnt.preventDefault();
        try {
            await auth.doPasswordReset(values.email);
            toast.success("Enviamos um email pra você para concluir a redefinição de senha!")
        }
        catch (err) {
            console.error(err);
            if (err && err.code) {
                switch (err.code) {
                    case 'auth/user-not-found':
                        toast.error("Usuário não encontrado");
                        break;
                    case 'auth/wrong-password':
                        toast.error("Senha incorreta");
                        break;
                    case 'auth/weak-password':
                        toast.error("Senha muito fraca");
                        break;
                    default:
                        toast.error("Falha ao registrar");
                        break;
                }
            }
            else
                toast.error("Falha ao registrar!");
        }
    }

    return (
        <Container>
            <Paper
                component="form"
                onSubmit={handleSubmit}
            >
                <Typography variant="h6" align="center" color="primary">Esqueci a senha</Typography>
                <div className="fields">
                    <TextField
                        required
                        label="E-mail"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="buttons">
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                    >
                        Resetar senha
                </Button>
                    <Typography
                        className="link"
                        color="primary"
                        align="center"
                        onClick={close}
                    >
                        Login
                </Typography>
                </div>
            </Paper>
        </Container>
    )
}
export default Page;