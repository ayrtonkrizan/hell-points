import React from "react";
import { FabAdd } from "components/iconbutton";
import useModal from "hooks/useModal";
import Form from "./form";
import List from "./list";

const DEFAULT_VALUES = {
    displayName: '',
    email: '',
    photoURL: '',
    password: '',
    isAdmin: false,
    inactive: false,
}

function Page() {
    const { isOpen, openModal, closeModal } = useModal(false);

    return (
        <>
            <List defaultValues={DEFAULT_VALUES} />
            <Form isOpen={isOpen} closeModal={closeModal} defaultValues={DEFAULT_VALUES} />
            <FabAdd onClick={openModal} />
        </>
    )
}

export default Page;
