import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const Component = ({ label = "", labelPlacement = "end", color = "default", checked, onChange, ...others }) => {
    return (
        <FormControlLabel
            onChange={onChange}
            control={<Checkbox color={color} />}
            label={label}
            labelPlacement={labelPlacement}
            checked={checked}
            {...others}
        />
    )
}

export default Component;