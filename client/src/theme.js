import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const rootTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "rgb(0, 153, 255)",
      },
      background: {
        default: "#fff",
      },
    },
    typography: {
      fontFamily:
        'Itim,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      body1: {
        fontSize: `${15 / 16}rem`,
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "strong, b": {
            fontWeight: "bold",
          },
        },
      },
      MuiButton: {
        root: {
          textTransform: "none",
          borderRadius: "0.5rem",
          fontSize: "1.2rem",
        },
      },
    },
  })
);

export default rootTheme;
