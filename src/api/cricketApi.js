import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
});

export const getLiveMatches = async () => {
  const { data } = await api.get("/cricket/live-matches");
  return Array.isArray(data) ? data : data?.matches || data?.data || [];
};

export const getMatchById = async (matchId) => {
  const { data } = await api.get(`/cricket/match/${matchId}`);
  return data;
};

export const getMatchInfo = async (matchId) => {
  const { data } = await api.get(`/cricket/match/${matchId}/info`);
  return data;
};

export const getMatchScorecard = async (matchId) => {
  const { data } = await api.get(`/cricket/match/${matchId}/scorecard`);
  return data;
};

export default api;
