import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Divider
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const MatchCard = ({ match }) => {

    const team1Score = match.scoreMap?.[match.team1Id];
    const team2Score = match.scoreMap?.[match.team2Id];

    return (

        <Card
            sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                transition: ".3s",
                cursor: "pointer",

                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 8
                }
            }}
        >

            <CardContent sx={{ p: 3 }}>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >

                    <Chip
                        label="🔴 LIVE"
                        color="error"
                        size="small"
                    />

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        {match.series}
                    </Typography>

                </Stack>

                <Stack spacing={2}>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {match.team1}
                        </Typography>

                        <Typography
                            color="primary"
                            fontWeight={700}
                        >
                            {team1Score
                                ? `${team1Score.runs}/${team1Score.wickets} (${team1Score.overs})`
                                : "--/--"}
                        </Typography>

                    </Stack>

                    <Typography color="text.secondary">
                        VS
                    </Typography>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {match.team2}
                        </Typography>

                        <Typography
                            color="primary"
                            fontWeight={700}
                        >
                            {team1Score
                                ? `${team2Score.runs}/${team2Score.wickets} (${team2Score.overs})`
                                : "--/--"}
                        </Typography>

                    </Stack>

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography
                    color="primary"
                    fontWeight={600}
                >
                    {match.status}
                </Typography>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={3}
                >

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Updated just now
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        sx={{
                            color: "primary.main"
                        }}
                    >

                        <Typography
                            color="inherit"
                            fontWeight={600}
                        >
                            Match Centre
                        </Typography>

                        <ArrowForwardRoundedIcon
                            fontSize="small"
                        />

                    </Stack>

                </Stack>

            </CardContent>

        </Card>

    );

};

export default MatchCard;