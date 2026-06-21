import { useState } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Box,
    Container
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import SportsCricketRoundedIcon from "@mui/icons-material/SportsCricketRounded";

import { Link, useLocation } from "react-router-dom";

const navItems = [
    { label: "Home", path: "/" },
    { label: "News", path: "/news" },
    { label: "Photos", path: "/photos" },
    { label: "Tournament", path: "/tournament" },
    { label: "Admin", path: "/admin" }
];

const Navbar = () => {

    const [open, setOpen] = useState(false);

    const location = useLocation();

    const toggleDrawer = () => {

        setOpen((prev) => !prev);

    };

    return (

        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "rgba(2,8,23,.92)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255,255,255,.08)"
            }}
        >

            <Container maxWidth="xl">

                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: {
                            xs: 56,
                            md: 64
                        },
                        px: {
                            xs: 1,
                            sm: 0
                        }
                    }}
                >

                    {/* Logo */}

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                            flexGrow: 1,
                            minWidth: 0
                        }}
                    >

                        <SportsCricketRoundedIcon
                            color="primary"
                        />

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            noWrap
                            sx={{
                                fontSize: {
                                    xs: "1.1rem",
                                    md: "1.5rem"
                                }
                            }}
                        >
                            CricScore
                        </Typography>

                    </Stack>

                    {/* Desktop Menu */}

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex"
                            }
                        }}
                    >

                        {navItems.map((item) => (

                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                color="inherit"
                                sx={{
                                    borderRadius: 2,

                                    bgcolor:
                                        location.pathname === item.path
                                            ? "primary.main"
                                            : "transparent",

                                    "&:hover": {
                                        bgcolor: "primary.dark"
                                    }
                                }}
                            >

                                {item.label}

                            </Button>

                        ))}

                    </Stack>

                    {/* Mobile Hamburger */}

                    <IconButton
                        color="inherit"
                        onClick={toggleDrawer}
                        sx={{
                            display: {
                                xs: "flex",
                                md: "none"
                            }
                        }}
                    >

                        <MenuIcon />

                    </IconButton>

                </Toolbar>

            </Container>

            {/* Drawer */}

            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer}
            >

                <Box
                    sx={{
                        width: {
                            xs: "78vw",
                            sm: 260
                        },
                        maxWidth: 300,
                        bgcolor: "background.default",
                        height: "100%"
                    }}
                >

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                            p: 3
                        }}
                    >
                        CricScore
                    </Typography>

                    <List>

                        {navItems.map((item) => (

                            <ListItemButton
                                key={item.path}
                                component={Link}
                                to={item.path}
                                selected={
                                    location.pathname === item.path
                                }
                                onClick={toggleDrawer}
                                sx={{
                                    py: 1.5
                                }}
                            >

                                <ListItemText
                                    primary={item.label}
                                />

                            </ListItemButton>

                        ))}

                    </List>

                </Box>

            </Drawer>

        </AppBar>

    );

};

export default Navbar;