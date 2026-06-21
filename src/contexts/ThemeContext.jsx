import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../theme";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {

    const [mode, setMode] = useState(() => {

        return localStorage.getItem("theme") || "light";

    });

    useEffect(() => {

        localStorage.setItem("theme", mode);

    }, [mode]);

    const toggleTheme = () => {

        setMode((prev) => (prev === "light" ? "dark" : "light"));

    };

    const theme = useMemo(() => {

        return mode === "light" ? lightTheme : darkTheme;

    }, [mode]);

    return (

        <ThemeContext.Provider
            value={{
                mode,
                toggleTheme
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>

    );

};

export const useThemeContext = () => useContext(ThemeContext);