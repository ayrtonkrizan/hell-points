import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "./styles";
import {
    Button,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import { AppContext } from "contexts/appContext";
import { ToastContext } from "contexts/toastContext";
import useQueryParams from "hooks/userQueryParams";

import Signup from "./signup";
import Forgot from "./forgot";

function Page() {
    const [showSignup, setShowSignup] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const store = useContext(AppContext);
    const toast = useContext(ToastContext);
    const history = useHistory();
    const { queryParams } = useQueryParams();
    const redirect = queryParams.redirect || '/';

    if (store.signed && history.location.pathname === '/signin') {
        history.push(redirect);
        return (<></>);
    }

    const handleSubmit = async (evnt) => {
        evnt.preventDefault();
        const form = evnt.target;
        try {
            await store.handleSignin(form.email.value, form.password.value);
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
                    default:
                        toast.error("Usuário ou senha inválido");
                        break;
                }
            }
            else
                toast.error("Falha ao fazer login!");
        }
    }
    if (showSignup)
        return <Signup close={() => setShowSignup(false)} />

    if (showForgot)
        return <Forgot close={() => setShowForgot(false)} />

    return (
        <Container>
            <Paper
                component="form"
                onSubmit={handleSubmit}
            >
                <Typography variant="h6" align="center" color="primary">Log In</Typography>
                <div className="fields">
                    <TextField
                        label="E-mail"
                        name="email"
                    />
                    <TextField
                        label="Senha"
                        name="password"
                        type="password"
                    />
                </div>
                <div className="buttons">
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                    >
                        Entrar
                </Button>
                    <Typography
                        className="link"
                        color="primary"
                        align="center"
                        onClick={() => setShowForgot(true)}
                    >
                        Esqueceu a senha?
                </Typography>
                    <Typography
                        className="link"
                        color="primary"
                        align="center"
                        onClick={() => setShowSignup(true)}
                    >
                        Ainda não tem cadastro?
                </Typography>
                </div>
            </Paper>
        </Container>
    )
}
export default Page;