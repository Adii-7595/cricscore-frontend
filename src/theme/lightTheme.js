import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#2563EB"
        },

        secondary: {
            main: "#F97316"
        },

        success: {
            main: "#22C55E"
        },

        error: {
            main: "#EF4444"
        },

        background: {
            default: "#F8FAFC",
            paper: "#FFFFFF"
        },

        text: {
            primary: "#0F172A",
            secondary: "#64748B"
        }
    },

    typography: {
        fontFamily: "Poppins, sans-serif",

        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },

        button: {
            fontWeight: 600,
            textTransform: "none"
        }
    },

    shape: {
        borderRadius: 16
    },

    components: {

        MuiButton: {

            styleOverrides: {

                root: {

                    borderRadius: 12,

                    padding: "10px 22px",

                    transition: ".25s",

                    boxShadow: "none",

                    "&:hover": {

                        transform: "translateY(-2px)",

                        boxShadow: "0 12px 25px rgba(0,0,0,.15)"

                    }

                }

            }

        },

        MuiCard: {

            styleOverrides: {

                root: {

                    borderRadius: 20,

                    boxShadow: "0 8px 24px rgba(15,23,42,.06)",

                    transition: ".25s",

                    "&:hover": {

                        transform: "translateY(-5px)",

                        boxShadow: "0 18px 40px rgba(15,23,42,.12)"

                    }

                }

            }

        },

        MuiAppBar: {

            styleOverrides: {

                root: {

                    background: "rgba(255,255,255,.75)",

                    backdropFilter: "blur(18px)",

                    color: "#0F172A",

                    boxShadow: "0 2px 15px rgba(0,0,0,.05)"

                }

            }

        }

    }

});

export default lightTheme;