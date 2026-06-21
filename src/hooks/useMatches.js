import { useEffect, useState } from "react";

import {
    getMatches,
    getMatchDetails
} from "../services/matchService";

// Pulls every inngsN key present on a team's score object, in innings order.
// Works for any number of innings (1 for limited-overs, up to 2 for tests)
// without hardcoding inngs1 / inngs2.
const collectInnings = (teamScore) => {

    if (!teamScore) {

        return [];

    }

    return Object.keys(teamScore)

        .filter((key) => key.startsWith("inngs"))

        .sort((a, b) => {

            const aNum = parseInt(a.replace("inngs", ""), 10);
            const bNum = parseInt(b.replace("inngs", ""), 10);

            return aNum - bNum;

        })

        .map((key) => {

            const innings = teamScore[key];

            return {

                runs: innings?.runs,

                wickets: innings?.wickets,

                overs: innings?.overs

            };

        });

};

const useMatches = (status) => {

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchMatches = async () => {

            try {

                setLoading(true);
                setError(null);

                const data = await getMatches(status);

                const matchList = data.matches || [];

                const enrichedMatches = await Promise.all(

                    matchList.map(async (match) => {

                        try {

                            const details = await getMatchDetails(match.matchId);

                            // rawData is the source of truth - matchInfoData /

                            // top-level enrichment can be null when enrichment

                            // hasn't completed, but rawData is always present.

                            const raw = details.match?.rawData;

                            const info = raw?.matchInfo;

                            const score = raw?.matchScore || {};

                            const matchFormat = info?.matchFormat || "";

                            const isTest =

                                matchFormat.toUpperCase() === "TEST";

                            const team1Innings = collectInnings(

                                score.team1Score

                            );

                            const team2Innings = collectInnings(

                                score.team2Score

                            );

                            return {

                                matchId: match.matchId,

                                series: match.series,

                                state: match.state,

                                status: match.status,

                                matchFormat,

                                isTest,

                                team1: {

                                    name: info?.team1?.teamName || match.team1,

                                    imageId: info?.team1?.imageId,

                                    innings: team1Innings

                                },

                                team2: {

                                    name: info?.team2?.teamName || match.team2,

                                    imageId: info?.team2?.imageId,

                                    innings: team2Innings

                                }

                            };

                        }

                        catch {

                            return {

                                matchId: match.matchId,

                                series: match.series,

                                state: match.state,

                                status: match.status,

                                matchFormat: "",

                                isTest: false,

                                team1: {
                                    name: match.team1,
                                    innings: []
                                },

                                team2: {
                                    name: match.team2,
                                    innings: []
                                }

                            };

                        }

                    })

                );

                setMatches(enrichedMatches);

            }

            catch (err) {

                setError(err);

            }

            finally {

                setLoading(false);

            }

        };

        fetchMatches();

    }, [status]);

    return {

        matches,
        loading,
        error

    };

};

export default useMatches;