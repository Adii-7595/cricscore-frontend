import {
    Card,
    Typography,
    Stack,
    Avatar,
    Box
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const STATE_STYLES = {

    "In Progress": {

        label: "LIVE",

        dot: "#EF4444",

        text: "#FCA5A5",

        bg: "rgba(239,68,68,.12)"

    },

    "Completed": {

        label: "RESULT",

        dot: "#22C55E",

        text: "#86EFAC",

        bg: "rgba(34,197,94,.1)"

    },

    "Upcoming": {

        label: "UPCOMING",

        dot: "#FBBF24",

        text: "#FDE68A",

        bg: "rgba(251,191,36,.1)"

    }

};

// Builds the score line(s) for a team.
// Non-test formats: identical single "runs/wkts (overs ov)" string as before.
// Test formats: every innings present is joined with " & ", e.g.
// "194/10 (24.5 ov) & 87/3 (22.0 ov)".
const formatScore = (team, isTest) => {

    const innings = team.innings || [];

    const playedInnings = innings.filter((inn) => inn?.runs != null);

    if (playedInnings.length === 0) {

        return null;

    }

    if (!isTest) {

        const inn = playedInnings[0];

        return [{

            runs: `${inn.runs}/${inn.wickets}`,

            overs: `(${inn.overs} ov)`

        }];

    }

    return playedInnings.map((inn) => ({

        runs: `${inn.runs}/${inn.wickets}`,

        overs: `(${inn.overs} ov)`

    }));

};

const TeamRow = ({ team, isBatting }) => {

    return (

        <Stack

            direction="row"

            alignItems="center"

            spacing={1.25}

            sx={{ minWidth: 0 }}

        >

            <Avatar

                src={team.logo}

                sx={{

                    width: 28,

                    height: 28,

                    fontSize: ".75rem",

                    bgcolor: "rgba(255,255,255,.06)",

                    border: "1px solid",

                    borderColor: isBatting ? "rgba(239,68,68,.5)" : "transparent",

                    flexShrink: 0

                }}

            >

                {team.name?.charAt(0)}

            </Avatar>

            <Typography

                noWrap

                sx={{

                    fontWeight: isBatting ? 700 : 500,

                    fontSize: { xs: ".875rem", sm: ".95rem" },

                    color: isBatting ? "#F8FAFC" : "#94A3B8",

                    minWidth: 0,

                    overflow: "hidden",

                    textOverflow: "ellipsis"

                }}

            >

                {team.name}

            </Typography>

            {isBatting && (

                <Box

                    component="span"

                    sx={{

                        width: 6,

                        height: 6,

                        borderRadius: "50%",

                        bgcolor: "#EF4444",

                        flexShrink: 0,

                        animation: "pulse 1.6s ease-in-out infinite",

                        "@keyframes pulse": {

                            "0%, 100%": { opacity: 1 },

                            "50%": { opacity: .3 }

                        },

                        "@media (prefers-reduced-motion: reduce)": {

                            animation: "none"

                        }

                    }}

                />

            )}

        </Stack>

    );

};

const ScoreBlock = ({ team, isTest }) => {

    const innings = formatScore(team, isTest);

    if (!innings) {

        return (

            <Typography

                sx={{

                    fontSize: { xs: ".8rem", sm: ".875rem" },

                    color: "#64748B",

                    fontStyle: "italic",

                    flexShrink: 0

                }}

            >

                Yet to bat

            </Typography>

        );

    }

    return (

        <Stack

            direction="row"

            alignItems="baseline"

            spacing={.5}

            flexWrap="wrap"

            justifyContent="flex-end"

            sx={{ flexShrink: 0, rowGap: .25 }}

        >

            {innings.map((score, idx) => (

                <Stack

                    key={idx}

                    direction="row"

                    alignItems="baseline"

                    spacing={.5}

                >

                    {idx > 0 && (

                        <Typography

                            sx={{

                                fontSize: { xs: ".75rem", sm: ".8rem" },

                                color: "#475569",

                                px: .25

                            }}

                        >

                            &amp;

                        </Typography>

                    )}

                    <Typography

                        sx={{

                            fontWeight: 700,

                            fontVariantNumeric: "tabular-nums",

                            fontSize: { xs: ".875rem", sm: "1rem" },

                            color: "#F8FAFC"

                        }}

                    >

                        {score.runs}

                    </Typography>

                    <Typography

                        sx={{

                            fontVariantNumeric: "tabular-nums",

                            fontSize: { xs: ".7rem", sm: ".75rem" },

                            color: "#64748B"

                        }}

                    >

                        {score.overs}

                    </Typography>

                </Stack>

            ))}

        </Stack>

    );

};

const MatchCard = ({ match }) => {

    const state = STATE_STYLES[match.state] || STATE_STYLES.Upcoming;

    const isLive = match.state === "In Progress";

    const isTest = match.isTest;

    // batting side = the team whose latest innings has no score resolved yet,

    // fallback to team1. Uses the last entry in `innings` since that's the

    // most recent/current one for both limited-overs and test matches.

    const team1Latest = match.team1.innings?.[match.team1.innings.length - 1];

    const team2Latest = match.team2.innings?.[match.team2.innings.length - 1];

    const battingTeam =

        team1Latest?.runs != null && team2Latest?.runs == null

            ? "team2"

            : "team1";

    return (

        <Card

            elevation={0}

            role="button"

            tabIndex={0}

            sx={{

                position: "relative",

                flexShrink: 0,

                bgcolor: "#0B1220",

                border: "1px solid",

                borderColor: "rgba(148,163,184,.12)",

                borderRadius: 2.5,

                pl: { xs: 2, sm: 2.5 },

                pr: { xs: 1.5, sm: 2 },

                py: { xs: 1.5, sm: 1.75 },

                cursor: "pointer",

                transition: "border-color .2s, background-color .2s",

                overflow: "hidden",

                "&::before": {

                    content: '""',

                    position: "absolute",

                    left: 0,

                    top: 0,

                    bottom: 0,

                    width: 3,

                    bgcolor: state.dot,

                    opacity: isLive ? 1 : .5

                },

                "&:hover": {

                    borderColor: "rgba(148,163,184,.28)",

                    bgcolor: "#0E1626"

                },

                "&:focus-visible": {

                    outline: "2px solid #3B82F6",

                    outlineOffset: 2

                }

            }}

        >

            {/* Eyebrow row: state + series */}

            <Stack

                direction="row"

                alignItems="center"

                spacing={1}

                sx={{ mb: 1.25 }}

            >

                <Stack

                    direction="row"

                    alignItems="center"

                    spacing={.5}

                    sx={{

                        bgcolor: state.bg,

                        color: state.text,

                        px: 1,

                        py: .25,

                        borderRadius: 999,

                        flexShrink: 0

                    }}

                >

                    {isLive && (

                        <Box

                            component="span"

                            sx={{

                                width: 5,

                                height: 5,

                                borderRadius: "50%",

                                bgcolor: state.dot,

                                animation: "blink 1.4s ease-in-out infinite",

                                "@keyframes blink": {

                                    "0%, 100%": { opacity: 1 },

                                    "50%": { opacity: .25 }

                                },

                                "@media (prefers-reduced-motion: reduce)": {

                                    animation: "none"

                                }

                            }}

                        />

                    )}

                    <Typography

                        sx={{

                            fontSize: ".65rem",

                            fontWeight: 700,

                            letterSpacing: ".06em"

                        }}

                    >

                        {state.label}

                    </Typography>

                </Stack>

                <Typography

                    noWrap

                    sx={{

                        fontSize: { xs: ".7rem", sm: ".75rem" },

                        color: "#64748B",

                        minWidth: 0,

                        overflow: "hidden",

                        textOverflow: "ellipsis"

                    }}

                >

                    {match.series}

                </Typography>

            </Stack>

            {/* Team rows */}

            <Stack spacing={.875} sx={{ mb: 1.25 }}>

                <Stack

                    direction="row"

                    justifyContent="space-between"

                    alignItems="center"

                    spacing={2}

                >

                    <TeamRow

                        team={match.team1}

                        isBatting={isLive && battingTeam === "team1"}

                    />

                    <ScoreBlock team={match.team1} isTest={isTest} />

                </Stack>

                <Stack

                    direction="row"

                    justifyContent="space-between"

                    alignItems="center"

                    spacing={2}

                >

                    <TeamRow

                        team={match.team2}

                        isBatting={isLive && battingTeam === "team2"}

                    />

                    <ScoreBlock team={match.team2} isTest={isTest} />

                </Stack>

            </Stack>

            {/* Status message - always visible, never clipped */}

            <Typography

                sx={{

                    fontSize: { xs: ".75rem", sm: ".8rem" },

                    fontWeight: 600,

                    color: isLive ? "#FCA5A5" : "#86EFAC",

                    mb: 1.25

                }}

            >

                {match.status}

            </Typography>

            {/* Footer: Match Centre CTA - always visible */}

            <Stack

                direction="row"

                justifyContent="flex-end"

                alignItems="center"

                spacing={.5}

                sx={{

                    pt: 1.25,

                    borderTop: "1px solid rgba(148,163,184,.08)",

                    color: "#60A5FA"

                }}

            >

                <Typography

                    sx={{

                        fontWeight: 600,

                        fontSize: ".8rem",

                        color: "inherit"

                    }}

                >

                    Match Centre

                </Typography>

                <ArrowForwardRoundedIcon

                    sx={{ fontSize: "1rem" }}

                />

            </Stack>

        </Card>

    );

};

export default MatchCard;