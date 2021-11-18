import React, { useState } from "react";
import { FabAdd } from "components/iconbutton";
import useModal from "hooks/useModal";
import Form from "./form";
import List from "./list";
import { Typography } from "@material-ui/core";

const DEFAULT_VALUES = {
    name: '',
    players: {},
    currentTurn: 10,
    turns: {},
    status: 'opened',
    winner: '',
}

function Page() {
    const { isOpen, openModal, closeModal } = useModal(false);
    const [formData, setFormData] = useState(DEFAULT_VALUES);

    const handleSelect = data => {
        console.log(data);
        setFormData({ ...DEFAULT_VALUES, ...data })
        openModal();
    }

    return (
        <>
            <Typography variant="h6" color="primary" align="center">Lista de partidas</Typography>
            <List defaultValues={DEFAULT_VALUES} onSelect={handleSelect} />
            <Form isOpen={isOpen} closeModal={closeModal} defaultValues={formData} />
            <FabAdd onClick={() => handleSelect({})} />
        </>
    )
}

export default Page;
