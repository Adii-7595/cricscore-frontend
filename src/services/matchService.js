import api from "./api";

export const getMatches = async (status = "live") => {

    const { data } = await api.get(
        `/cricket/live-matches?status=${status}`
    );

    return data;

};

export const getMatchDetails = async (matchId) => {
    const { data } = await api.get(`/cricket/match/${matchId}`);
    return data;
};