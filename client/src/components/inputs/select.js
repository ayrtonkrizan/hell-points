import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
// import Tag from "~/components/chip";

const Select = ({ options = [], name = "", label, value, onChange, ...others }) => {

    return (
        <Autocomplete
            style={{ marginBottom: 8 }}
            fullWidth
            options={options}
            id={name}
            value={value}
            onChange={onChange}
            {...others}
            renderInput={(params) => <TextField fullWidth name={name} {...params} label={label} />}
        />
    )
}
export default Select;
// export const SelectMultiple = ({ options, name, label, value, onChange, getOptionLabel=(option)=>option, fixedOptions = [], ...others }) => {
//     return (
//         <Autocomplete
//             style={{ marginBottom: 8 }}
//             multiple
//             disableCloseOnSelect
//             fullWidth
//             options={options}
//             id={name}
//             getOptionLabel={getOptionLabel}
//             onChange={onChange}
//             renderInput={(params) => <TextField fullWidth name={name} {...params} label={label} />}
//             renderTags={(values, getTagProps) => values.map((option, index) => (<Tag label={getOptionLabel(option)} {...getTagProps({ index })} disabled={fixedOptions.indexOf(option) !== -1} />))}
//             value={value}
//             {...others}
//         />
//     )

// }