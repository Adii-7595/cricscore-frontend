import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Box,
    useMediaQuery
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { Link } from "react-router-dom";

import { useThemeContext } from "../../contexts/ThemeContext";

const pages = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "News",
        path: "/news"
    },
    {
        name: "Photos",
        path: "/photos"
    },
    {
        name: "Tournament",
        path: "/tournament"
    }
];

const Navbar = () => {

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { mode, toggleTheme } = useThemeContext();

    const [open, setOpen] = useState(false);

    return (

        <AppBar position="sticky">

            <Toolbar>

                <Typography
                    variant="h5"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700
                    }}
                >

                    CricScore

                </Typography>

                {isMobile ? (

                    <>

                        <IconButton
                            color="inherit"
                            onClick={toggleTheme}
                        >

                            {mode === "light"

                                ? <DarkModeIcon />

                                : <LightModeIcon />}

                        </IconButton>

                        <IconButton
                            color="inherit"
                            onClick={() => setOpen(true)}
                        >

                            <MenuIcon />

                        </IconButton>

                        <Drawer
                            anchor="right"
                            open={open}
                            onClose={() => setOpen(false)}
                        >

                            <Box
                                sx={{
                                    width: 250
                                }}
                            >

                                <List>

                                    {pages.map((page) => (

                                        <ListItemButton

                                            key={page.name}

                                            component={Link}

                                            to={page.path}

                                            onClick={() => setOpen(false)}

                                        >

                                            <ListItemText
                                                primary={page.name}
                                            />

                                        </ListItemButton>

                                    ))}

                                </List>

                            </Box>

                        </Drawer>

                    </>

                ) : (

                    <>

                        {pages.map((page) => (

                            <Button

                                key={page.name}

                                color="inherit"

                                component={Link}

                                to={page.path}

                            >

                                {page.name}

                            </Button>

                        ))}

                        <IconButton
                            color="inherit"
                            onClick={toggleTheme}
                        >

                            {mode === "light"

                                ? <DarkModeIcon />

                                : <LightModeIcon />}

                        </IconButton>

                        <Button

                            color="inherit"
                            component={Link}
                            to="/admin/login"
                        >

                            Admin

                        </Button>

                    </>

                )}

            </Toolbar>

        </AppBar>

    );

};

export default Navbar;