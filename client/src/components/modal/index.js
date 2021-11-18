import React, { useEffect } from "react";
import { Container } from "./styles";
import {
    Modal as ModalMUI,
    Typography,
} from "@material-ui/core";
import { TooltipIconButton as IconButton, DeleteIconButton } from "components/iconbutton";
import {
    Cancel as CloseIcon,
    Save as SaveIcon,
} from "@material-ui/icons"

function Modal({
    isOpen,
    closeModal,
    title,
    children,
    footer,
    onSubmit,
    onDelete,
    loading,
}) {
    useEffect(() => {
        const handlerKeyPress = (evnt) => {
            if (!evnt || !evnt.key) return;
            switch (evnt.key) {
                case 'Enter':
                    if (evnt.ctrlKey && onSubmit)
                        onSubmit();
                    break;
                // onClose do modal faz a função abaixo;
                // case 'Escape':
                //     closeModal()
                //     break;
                default:
                    break;
            }
        }
        document.removeEventListener('keydown', handlerKeyPress);
        document.addEventListener('keydown', handlerKeyPress);
        return () => {
            document.removeEventListener('keydown', handlerKeyPress);
        }
    }, [closeModal, onSubmit])
    return (
        <ModalMUI open={isOpen} onClose={closeModal}>
            <Container elevation={5}>
                <div className="header">
                    <Typography className="title" variant="h6" color="primary">{title}</Typography>
                    {
                        onSubmit &&
                        <IconButton title="ctrl+⏎" onClick={onSubmit}>
                            <SaveIcon color="primary" />
                        </IconButton>
                    }
                    {
                        onDelete &&
                        <DeleteIconButton onClick={onDelete} />
                    }
                    <IconButton title="esc" onClick={closeModal}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="content">
                    {children}
                </div>
                <div className="footer">
                    {footer}
                </div>
            </Container>
        </ModalMUI>
    )
}

export default Modal;