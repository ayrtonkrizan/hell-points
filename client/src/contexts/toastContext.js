import { useState, createContext } from "react";
import {
    Snackbar
} from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ToastContext = createContext({
    success: () => false,
    error: () => false,
    warning: () => false,
});

export const ToastContextProvider = ({ autoHideDuration = 6000, children }) => {
    const [values, setValues] = useState({ type: 'success', message: '', isOpen: false });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setValues(values => ({ ...values, isOpen: false }));
    };

    const store = {
        success: (message = '') => setValues({ type: 'success', message, isOpen: true }),
        error: (message = '') => setValues({ type: 'error', message, isOpen: true }),
        warning: (message = '') => setValues({ type: 'warning', message, isOpen: true }),
        info: (message = '') => setValues({ type: 'info', message, isOpen: true }),
    }

    return (
        <ToastContext.Provider value={store}>
            {children}
            <Snackbar open={values.isOpen} autoHideDuration={autoHideDuration} onClose={handleClose}>
                <Alert onClose={handleClose} severity={values.type}>
                    {values.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    )
}