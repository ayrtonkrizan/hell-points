import { useState } from "react";

function useModal({ initialState }) {
    const [isOpen, setIsOpen] = useState(Boolean(initialState));
    return {
        isOpen,
        openModal: () => setTimeout(() => setIsOpen(true), 100),
        closeModal: () => setTimeout(() => setIsOpen(false), 100),
    }
}

export default useModal;