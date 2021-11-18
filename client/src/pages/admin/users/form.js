import React, { useState, useContext } from "react";
import { db } from "firebase-folder";
import { ToastContext } from "contexts/toastContext";
import Modal from "components/modal";
import Checkbox from "components/inputs/checkbox";

import {
    TextField,
} from "@material-ui/core";

function Page({ isOpen, closeModal, defaultValues = {} }) {
    const toast = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState(defaultValues);

    const handleChange = evnt => {
        if (!evnt || !evnt.target) return;
        const { value, name } = evnt.target
        setValues(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await db.addUsers(values);
            toast.success("Usuario criado com sucesso");
        }
        catch (err) {
            console.error(err);
            toast.error("Erro ao cadastrar usuário")
            if (err && err.code) {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        toast.error("Email já cadastrado!");
                        break;
                    case 'auth/weak-password':
                        toast.error("Senha muito fraca!");
                        break;
                    default:
                        toast.error(err.message)
                        break;
                }
            }
            else
                toast.error("Erro ao cadastrar usuário")
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            title="Cadastro de usuário"
            onSubmit={handleSubmit}
            onDelete={(evnt) => console.log('foi', evnt)}
            loading={loading}
        >
            <Checkbox
                label="Admin?"
                name="isAdmin"
                checked={values.isAdmin}
                onChange={evnt => setValues({ ...values, isAdmin: evnt.target.checked })}
            />
            <TextField
                fullWidth
                autoComplete="email"
                onFocus={evnt => evnt.target.select()}
                onChange={handleChange}
                value={values.email}
                label="Email"
                name="email"
            />
            <TextField
                fullWidth
                autoComplete="password"
                onFocus={evnt => evnt.target.select()}
                onChange={handleChange}
                value={values.password}
                type="password"
                label="Senha"
                name="password"
            />
            <TextField
                fullWidth
                autoComplete="name"
                onFocus={evnt => evnt.target.select()}
                onChange={handleChange}
                value={values.displayName}
                label="Nome"
                name="displayName"
            />
        </Modal>
    )
}
export default Page;