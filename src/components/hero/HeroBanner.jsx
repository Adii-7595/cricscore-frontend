import {
    Box,
    Container,
    Typography,
    Button,
    Stack
} from "@mui/material";

import SportsCricketRoundedIcon from "@mui/icons-material/SportsCricketRounded";

import stadium from "../../assets/images/hero/stadium.jpg";

const HeroBanner = () => {

    return (

        <Box
            sx={{
                position: "relative",

                width: "100%",

                minHeight: {
                    xs: "60vh",
                    sm: "70vh",
                    md: "80vh"
                },

                display: "flex",

                alignItems: "center",

                backgroundImage: `url(${stadium})`,

                backgroundSize: "cover",

                backgroundPosition: "center",

                backgroundRepeat: "no-repeat"
            }}
        >

            {/* Overlay */}

            <Box
                sx={{
                    position: "absolute",

                    inset: 0,

                    background:
                        "linear-gradient(rgba(2,8,23,.80), rgba(2,8,23,.88))"
                }}
            />

            <Container
                maxWidth="xl"
                sx={{
                    position: "relative",

                    zIndex: 2
                }}
            >

                <Stack

                    spacing={{
                        xs: 3,
                        md: 4
                    }}

                    sx={{
                        width: {
                            xs: "100%",
                            md: "65%",
                            lg: "55%"
                        }
                    }}

                >

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >

                        <SportsCricketRoundedIcon
                            color="success"
                        />

                        <Typography
                            sx={{
                                color: "success.main",

                                fontWeight: 700,

                                letterSpacing: 2,

                                fontSize: {
                                    xs: ".9rem",
                                    md: "1rem"
                                }
                            }}
                        >

                            LIVE CRICKET

                        </Typography>

                    </Stack>

                    <Typography

                        sx={{

                            fontWeight: 800,

                            lineHeight: 1.1,

                            fontSize: {

                                xs: "2.5rem",

                                sm: "3.3rem",

                                md: "4.5rem",

                                lg: "5.5rem"

                            }

                        }}

                    >

                        Every Match.

                        <br />

                        Every Moment.

                    </Typography>

                    <Typography

                        sx={{

                            color: "grey.300",

                            maxWidth: 650,

                            lineHeight: 1.8,

                            fontSize: {

                                xs: "1rem",

                                sm: "1.1rem",

                                md: "1.25rem"

                            }

                        }}

                    >

                        Live scores, ball-by-ball commentary,

                        player statistics, tournaments,

                        breaking news and photo galleries —

                        all in one place.

                    </Typography>

                    <Stack

                        direction={{

                            xs: "column",

                            sm: "row"

                        }}

                        spacing={2}

                    >

                        <Button

                            variant="contained"

                            size="large"

                            sx={{

                                width: {

                                    xs: "100%",

                                    sm: "fit-content"

                                },

                                px: {

                                    xs: 3,

                                    md: 5

                                },

                                py: 1.5

                            }}

                        >

                            Explore Matches

                        </Button>

                        <Button

                            variant="outlined"

                            size="large"

                            sx={{

                                width: {

                                    xs: "100%",

                                    sm: "fit-content"

                                },

                                px: {

                                    xs: 3,

                                    md: 5

                                },

                                py: 1.5,

                                color: "#fff",

                                borderColor: "#fff",

                                "&:hover": {

                                    borderColor: "#fff",

                                    backgroundColor:
                                        "rgba(255,255,255,.08)"

                                }

                            }}

                        >

                            Latest News

                        </Button>

                    </Stack>

                </Stack>

            </Container>

        </Box>

    );

};

export default HeroBanner;