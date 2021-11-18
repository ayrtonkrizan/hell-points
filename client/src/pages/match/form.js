import React, { useState, useContext, useEffect } from "react";
import { db } from "firebase-folder";
import { ToastContext } from "contexts/toastContext";
import Modal from "components/modal";

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
            if(values.id){
                await db.updateMatch(values);
                toast.success("Partida atualizada com sucesso");
            }
            else{
                await db.addMatch(values);
                toast.success("Partida criada com sucesso");
            }
            closeModal();
        }
        catch (err) {
            console.error(err);
            toast.error("Erro ao cadastrar partida");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        setValues(defaultValues)
    },[defaultValues])

    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            title="Cadastro de usuário"
            onSubmit={handleSubmit}
            onDelete={(evnt) => console.log('foi', evnt)}
            loading={loading}
        >
            <TextField
                fullWidth
                onFocus={evnt => evnt.target.select()}
                onChange={handleChange}
                value={values.name}
                label="Nome partida"
                name="name"
            />
        </Modal>
    )
}
export default Page;