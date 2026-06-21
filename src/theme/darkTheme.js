import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {

        mode: "dark",

        primary: {
            main: "#3B82F6"
        },

        secondary: {
            main: "#FB923C"
        },

        success: {
            main: "#22C55E"
        },

        error: {
            main: "#F87171"
        },

        background: {

            default: "#020617",

            paper: "#0F172A"

        },

        text: {

            primary: "#F8FAFC",

            secondary: "#CBD5E1"

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

                    boxShadow: "none"

                }

            }

        },

        MuiCard: {

            styleOverrides: {

                root: {

                    borderRadius: 20,

                    boxShadow: "0 8px 24px rgba(0,0,0,.35)",

                    transition: ".25s"

                }

            }

        },

        MuiAppBar: {

            styleOverrides: {

                root: {

                    background: "rgba(2,6,23,.8)",

                    backdropFilter: "blur(18px)",

                    boxShadow: "0 2px 20px rgba(0,0,0,.4)"

                }

            }

        }

    }

});

export default darkTheme;