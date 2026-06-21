import { useState } from "react";

import {
    Container,
    Grid,
    Box,
    Typography
} from "@mui/material";

import useMatches from "../../hooks/useMatches";

import MatchTabs from "./MatchTabs";
import MatchCard from "./MatchCard";

import LoadingSpinner from "../ui/LoadingSpinner";
import EmptyState from "../ui/EmptyState";
import SectionHeader from "../ui/SectionHeader";

const MatchSection = () => {

    const [status, setStatus] = useState("live");

    const {
        matches,
        loading
    } = useMatches(status);

    return (

        <Container
            maxWidth="xl"
            sx={{ py: 6 }}
        >

            <SectionHeader title={
                status === "live"
                    ? "Live Match"
                    : status === "upcoming"
                        ? "Upcoming Match"
                        : "Recent Match"
            } />

            <MatchTabs
                status={status}
                onChange={setStatus}
            />

            {loading && <LoadingSpinner />}

            {!loading && matches.length === 0 && (

                <EmptyState message="No matches found." />

            )}

            {!loading && matches.length > 0 && (

                /*<Grid container spacing={4}>

                    {matches.map(match => (

                        <Grid
                            key={match.matchId}
                            size={{ xs: 12, md: 6, lg: 8 }}
                        >

                            <MatchCard match={match} />

                        </Grid>

                    ))}

                </Grid>*/
                <Box
                sx={{
                    display: "grid",
                    gap: 3,
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, 1fr)",
                        xl: "repeat(3, 1fr)"
                    },
                    maxWidth: 700,
                    mx: "auto"
                }}
            >
                    {matches.length > 0 && (

                        <MatchCard
                            match={matches[0]}
                        />

                    )}
            </Box>

            )}

        </Container>

    );

};

export default MatchSection;