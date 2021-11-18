import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButtonMUI from '@material-ui/core/IconButton';
import TooltipMUI from '@material-ui/core/Tooltip';
import { StyledFab, StyledCircular } from "./styles";

import {
    Add as AddIcon,
    Delete as DeleteIcon
} from "@material-ui/icons";

function IconButton({ children, loading, ...other }) {
    return (
        <IconButtonMUI {...other}>
            {children}
            {loading && <CircularProgress className="circular-progress" />}
        </IconButtonMUI>
    )
}

export default IconButton;

export function TooltipIconButton({ title, children, loading, disabled, ...other }) {
    return (
        <TooltipMUI title={title}>
            <IconButtonMUI {...other} disabled={loading || disabled}>
                {children}
                {loading && <StyledCircular />}
            </IconButtonMUI>
        </TooltipMUI>
    )
}

export const DeleteIconButton = ({ onClick, deleteIconColor = "primary", size = "medium", fontSize = "default" }) => {
    const [intervalId, setIntervalId] = useState();
    const [progress, setProgress] = useState(0);

    const handleHoldingPress = (evnt) => {
        evnt.stopPropagation();
        if (intervalId) {
            handleCancel();
            return;
        }
        let id = setInterval(() => {
            setProgress(progress => progress + 4);
        }, 75);
        setIntervalId(id);
    }

    const handleCancel = () => {
        if (intervalId) {
            setIntervalId()
            clearInterval(intervalId);
            setProgress(0);
        }
    }

    useEffect(() => {
        /** numero maior que 100 para dar mais segurança ao usuário excluir */
        if (progress > 112 && intervalId) {
            onClick();
            setIntervalId();
            clearInterval(intervalId);
        }
    }, [intervalId, progress, onClick])
    return (
        <TooltipIconButton onTouchStart={handleHoldingPress} onTouchEnd={handleCancel} onMouseDown={handleHoldingPress} onMouseLeave={handleCancel} onMouseUp={handleCancel} title={"Segure para remover"} size={size}>
            <StyledCircular variant="determinate" value={progress > 100 ? 100 : progress} />
            <DeleteIcon color={deleteIconColor} fontSize={fontSize} />
        </TooltipIconButton>
    )
}

export const FabAdd = ({ ...others }) => {
    return (
        <StyledFab color="primary" {...others}>
            <AddIcon />
        </StyledFab>
    )
}