// import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#3f3b3b',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: '#fff',
//     },
//   },
// });

const theme = createMuiTheme({
    "typography": {
        "fontFamily": [
            "Roboto"
        ]
    },
    "palette": {
        "common": {
            "black": "rgba(0, 0, 0, 1)",
            "white": "#fff"
        },
        "background": {
            "paper": "#fff",
            "default": "#fafafa"
        },
        "primary": {
            "light": "#7986cb",
            "main": "rgba(50, 65, 158, 1)",
            "dark": "#303f9f",
            "contrastText": "#fff"
        },
        "secondary": {
            "light": "#fff",
            "main": "#fff",
            "dark": "#f0f0f0",
            "contrastText": "rgba(50, 65, 158, 1)"
        },
        "error": {
            "light": "#e57373",
            "main": "#f44336",
            "dark": "#d32f2f",
            "contrastText": "#fff"
        },
        "text": {
            "primary": "rgba(26, 26, 26, 1)",
            "secondary": "rgba(0, 0, 0, 0.54)",
            "disabled": "rgba(0, 0, 0, 0.38)",
            "hint": "rgba(0, 0, 0, 0.38)"
        }
    }
})
export default theme;
