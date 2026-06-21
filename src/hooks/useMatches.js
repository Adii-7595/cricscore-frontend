import { useEffect, useState } from "react";

import {
    getMatches,
    getMatchDetails
} from "../services/matchService";

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

                if (matchList.length > 0) {

                    const details = await getMatchDetails(matchList[0].matchId);

                    const matchData = details.match;
                    console.log(Object.keys(matchData));
                    console.log(matchData.matchInfoData.team1);
                    console.log(matchData.matchInfoData.team2);

                    const innings =
                        matchData?.commentaryData?.miniscore?.inningsscores?.inningsscore || [];

                    const scoreMap = {};

                    innings.forEach((inning) => {

                        scoreMap[inning.batteamid] = {
                            runs: inning.runs,
                            wickets: inning.wickets,
                            overs: inning.overs
                        };

                    });

                    const featuredMatch = {

                        ...matchList[0],

                        team1Id: matchData.matchInfoData.team1.teamid,

                        team2Id: matchData.matchInfoData.team2.teamid,
                        

                        scoreMap

                    };

                    setMatches([featuredMatch]);

                } else {

                    setMatches([]);

                }

            }

            catch (err) {

                console.error(err);

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