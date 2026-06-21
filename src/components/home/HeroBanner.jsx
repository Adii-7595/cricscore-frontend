import {
    Box,
    Container,
    Typography,
    Stack
} from "@mui/material";

import SportsCricketRoundedIcon from "@mui/icons-material/SportsCricketRounded";

import AppButton from "../ui/AppButton";

import stadium from "../../assets/images/hero/stadium.jpg";

const HeroBanner = () => {

    return (

        <Box
            sx={{
                position: "relative",
                minHeight: {
                    xs: "75vh",
                    md: "90vh"
                },
                display: "flex",
                alignItems: "center",
                overflow: "hidden"
            }}
        >

            {/* Background */}

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${stadium})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: -3
                }}
            />

            {/* Overlay */}

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to right, rgba(2,6,23,.92), rgba(2,6,23,.65), rgba(2,6,23,.45))",
                    zIndex: -2
                }}
            />

            {/* Decorative Glow */}

            <Box
                sx={{
                    position: "absolute",
                    width: 450,
                    height: 450,
                    borderRadius: "50%",
                    background: "rgba(37,99,235,.25)",
                    filter: "blur(120px)",
                    right: -150,
                    top: -120,
                    zIndex: -1
                }}
            />

            <Container maxWidth="xl">

                <Stack spacing={4} maxWidth={700}>

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <SportsCricketRoundedIcon
                            sx={{
                                color: "#22C55E",
                                fontSize: 42
                            }}
                        />

                        <Typography
                            sx={{
                                color: "#22C55E",
                                fontWeight: 600,
                                letterSpacing: 3
                            }}
                        >

                            LIVE CRICKET

                        </Typography>

                    </Stack>

                    <Typography
                        variant="h1"
                        sx={{
                            color: "white",
                            lineHeight: 1.1,
                            fontSize: {
                                xs: "3rem",
                                md: "5rem"
                            }
                        }}
                    >

                        Every Match.

                        <br />

                        Every Moment.

                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            color: "rgba(255,255,255,.85)",
                            lineHeight: 1.8,
                            maxWidth: 600
                        }}
                    >

                        Live scores, breaking news, player statistics,
                        tournaments and stunning photo galleries —
                        everything a cricket fan needs in one place.

                    </Typography>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={2}
                    >

                        <AppButton size="large">

                            Explore Matches

                        </AppButton>

                        <AppButton
                            size="large"
                            variant="outlined"
                            sx={{
                                color: "white",
                                borderColor: "rgba(255,255,255,.4)",

                                "&:hover": {
                                    borderColor: "white"
                                }
                            }}
                        >

                            Latest News

                        </AppButton>

                    </Stack>

                </Stack>

            </Container>

        </Box>

    );

};

export default HeroBanner;