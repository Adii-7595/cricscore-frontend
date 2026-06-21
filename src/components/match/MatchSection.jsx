import { useState, useEffect } from "react";

import {
    Container,
    Box,
    Typography,
    Button
} from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import useMatches from "../../hooks/useMatches";

import MatchTabs from "./MatchTabs";
import MatchCard from "./MatchCard";

import LoadingSpinner from "../ui/LoadingSpinner";
import EmptyState from "../ui/EmptyState";
import SectionHeader from "../ui/SectionHeader";

const PREVIEW_COUNT = 3;

const MatchSection = () => {

    const [status, setStatus] = useState("live");

    const [expanded, setExpanded] = useState(false);

    const {

        matches,

        loading

    } = useMatches(status);

    // Collapse back to preview whenever the tab changes

    useEffect(() => {

        setExpanded(false);

    }, [status]);

    const visibleMatches = expanded

        ? matches

        : matches.slice(0, PREVIEW_COUNT);

    const hasMore = matches.length > PREVIEW_COUNT;

    return (

        <Container

            maxWidth="xl"

            sx={{

                px: { xs: 1.5, sm: 3 },

                py: { xs: 3, md: 8 }

            }}

        >

            <Box

                sx={{

                    borderRadius: { xs: 3, md: 4 },

                    border: "1px solid",

                    borderColor: "rgba(148,163,184,.12)",

                    bgcolor: "#070C16",

                    overflow: "hidden"

                }}

            >

                <Box sx={{ p: { xs: 2, md: 4 } }}>

                    <SectionHeader

                        title="Matches"

                        actionText="View All"

                        actionLink="/matches"

                    />

                    <MatchTabs

                        status={status}

                        onChange={setStatus}

                    />

                </Box>

                {loading && <LoadingSpinner />}

                {!loading && matches.length === 0 && (

                    <EmptyState message="No matches found." />

                )}

                {!loading && matches.length > 0 && (

                    <>

                        {/* Scrolls internally ONLY once expanded past the preview;

                            this is the parent container that owns its own scroll,

                            never the page. */}

                        <Box

                            sx={{

                                px: { xs: 1.5, sm: 2, md: 4 },

                                display: "flex",

                                flexDirection: "column",

                                gap: { xs: 1.25, md: 1.5 },

                                ...(expanded && {

                                    overflowY: "auto",

                                    maxHeight: { xs: "60vh", sm: 560, md: 640 },

                                    minHeight: 0,

                                    pr: { xs: 1, md: 2 },

                                    "&::-webkit-scrollbar": { width: 6 },

                                    "&::-webkit-scrollbar-thumb": {

                                        bgcolor: "#1E293B",

                                        borderRadius: 10

                                    }

                                })

                            }}

                        >

                            {visibleMatches.map((match) => (

                                <MatchCard

                                    key={match.matchId}

                                    match={match}

                                />

                            ))}

                        </Box>

                        <Box

                            sx={{

                                px: { xs: 1.5, sm: 2, md: 4 },

                                pt: { xs: 2, md: 2.5 },

                                pb: { xs: 2.5, md: 4 },

                                display: "flex",

                                justifyContent: "center"

                            }}

                        >

                            {hasMore && (

                                <Button

                                    onClick={() => setExpanded((prev) => !prev)}

                                    endIcon={

                                        <KeyboardArrowDownRoundedIcon

                                            sx={{

                                                transform: expanded

                                                    ? "rotate(180deg)"

                                                    : "none",

                                                transition: "transform .2s"

                                            }}

                                        />

                                    }

                                    sx={{

                                        textTransform: "none",

                                        fontWeight: 600,

                                        fontSize: ".85rem",

                                        color: "#94A3B8",

                                        border: "1px solid rgba(148,163,184,.18)",

                                        borderRadius: 999,

                                        px: 2.5,

                                        py: .75,

                                        "&:hover": {

                                            bgcolor: "rgba(148,163,184,.06)",

                                            borderColor: "rgba(148,163,184,.32)"

                                        }

                                    }}

                                >

                                    {expanded

                                        ? "Show less"

                                        : `Show ${matches.length - PREVIEW_COUNT} more`}

                                </Button>

                            )}

                            {!hasMore && (

                                <Typography

                                    sx={{

                                        fontSize: ".75rem",

                                        color: "#475569"

                                    }}

                                >

                                    That's all for {status === "live" ? "now" : "this list"}.

                                </Typography>

                            )}

                        </Box>

                    </>

                )}

            </Box>

        </Container>

    );

};

export default MatchSection;