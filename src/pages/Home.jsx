import { useEffect, useMemo, useState } from "react";
import Header from "../components/layout/Header";
import MatchCard from "../components/match/MatchCard";
import BottomNav from "../components/layout/BottomNav";
import {
  getLiveMatches,
  getMatchById,
  getMatchScorecard,
} from "../api/cricketApi";

const MATCH_TABS = [
  { label: "Live", state: "In Progress", value: "live" },
  { label: "Preview", state: "Preview", value: "preview" },
];

const scoreText = (score) => {
  if (score === undefined || score === null || score === "") {
    return "";
  }

  if (typeof score === "string") {
    return score;
  }

  const runs = score.runs ?? score.run ?? score.score;
  const wickets = score.wickets ?? score.wicket ?? score.wkts;
  const overs = score.overs ?? score.over;
  const declared = score.isDeclared ? "d" : "";

  if (runs === undefined && wickets === undefined && overs === undefined) {
    return "";
  }

  const inningsScore =
    wickets === undefined || wickets === null
      ? `${runs}${declared}`
      : `${runs}/${wickets}${declared}`;

  return overs ? `${inningsScore} (${overs})` : inningsScore;
};

const scoreGroupText = (scoreGroup) => {
  if (!scoreGroup || typeof scoreGroup !== "object") {
    return scoreText(scoreGroup);
  }

  return Object.values(scoreGroup)
    .filter(Boolean)
    .sort((first, second) => (first.inningsId || 0) - (second.inningsId || 0))
    .map((innings) => scoreText(innings))
    .filter(Boolean)
    .join(" & ");
};

const normalizeInnings = (data) => {
  const match = data?.match || data;
  const rawMatchScore = match?.rawData?.matchScore || data?.rawData?.matchScore;

  if (rawMatchScore) {
    return [
      {
        team: match?.team1 || data?.team1,
        score: scoreGroupText(rawMatchScore.team1Score),
      },
      {
        team: match?.team2 || data?.team2,
        score: scoreGroupText(rawMatchScore.team2Score),
      },
    ];
  }

  const candidates = [
    data?.scorecard,
    data?.scoreCard,
    data?.innings,
    data?.scorecard?.scorecard,
    data?.scoreCard?.scorecard,
    data?.scorecard?.innings,
    data?.scoreCard?.innings,
    data?.data?.scorecard,
    data?.data?.scoreCard,
    data?.data?.innings,
    data?.data?.scorecard?.scorecard,
    data?.data?.scoreCard?.scorecard,
    data?.match?.scorecard?.scorecard,
    data?.match?.scorecard?.innings,
  ].filter(Boolean);

  const innings = candidates.find((item) => Array.isArray(item));

  if (innings) {
    return innings.map((inning) => ({
      team:
        inning.batteamname ||
        inning.batteamsname ||
        inning.teamName ||
        inning.batTeamName ||
        inning.battingTeam ||
        inning.team?.name ||
        inning.team,
      score: scoreText(inning.score) || scoreText(inning),
    }));
  }

  return [
    {
      team: data?.team1 || data?.team1Name || data?.batTeamName,
      score: scoreText(data?.team1Score || data?.score1),
    },
    {
      team: data?.team2 || data?.team2Name || data?.bowlTeamName,
      score: scoreText(data?.team2Score || data?.score2),
    },
  ];
};

const applyInningsScores = (match, innings) => ({
  ...match,
  team1Score:
    innings.find((inning) => inning.team === match.team1)?.score ||
    innings[0]?.score ||
    "",
  team2Score:
    innings.find((inning) => inning.team === match.team2)?.score ||
    innings[1]?.score ||
    "",
});

const hasAnyScore = (match) => Boolean(match.team1Score || match.team2Score);

const withScoreDetails = async (match) => {
  if (match.state === "Preview") {
    return match;
  }

  try {
    const scorecard = await getMatchScorecard(match.matchId);
    const innings = normalizeInnings(scorecard);
    const scoredMatch = applyInningsScores(match, innings);

    if (hasAnyScore(scoredMatch)) {
      return scoredMatch;
    }

    const detail = await getMatchById(match.matchId);
    return applyInningsScores(match, normalizeInnings(detail));
  } catch {
    try {
      const detail = await getMatchById(match.matchId);
      return applyInningsScores(match, normalizeInnings(detail));
    } catch {
      return match;
    }
  }
};

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState("live");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadLiveMatches = async () => {
      try {
        setIsLoading(true);
        setError("");
        const liveMatches = await getLiveMatches();
        const enrichedMatches = await Promise.all(
          liveMatches.map((match) => withScoreDetails(match))
        );

        if (isMounted) {
          setMatches(enrichedMatches);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load live matches. Please check your API server.");
          setMatches([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadLiveMatches();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentTab = MATCH_TABS.find((tab) => tab.value === activeTab);
  const filteredMatches = matches.filter(
    (match) => match.state === currentTab.state
  );
  const liveCount = matches.filter((match) => match.state === "In Progress")
    .length;
  const previewCount = matches.filter((match) => match.state === "Preview")
    .length;
  const featuredMatch = filteredMatches[0];
  const matchCount = filteredMatches.length;
  const seriesCount = useMemo(
    () =>
      new Set(filteredMatches.map((match) => match.series).filter(Boolean))
        .size,
    [filteredMatches]
  );

  return (
    <div className="home-container">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={MATCH_TABS}
      />

      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">{currentTab.label} Cricket</span>
          <h2>
            {activeTab === "live"
              ? "Follow every match as it happens."
              : "Preview every match before the first ball."}
          </h2>
          <p>
            Scores, match status, squads and commentary stay ready from your
            cricket API.
          </p>
        </div>

        <div className="hero-score">
          <strong>{matchCount}</strong>
          <span>{currentTab.label}</span>
        </div>
      </section>

      <section className="stats-strip" aria-label="Dashboard overview">
        <div>
          <strong>{matchCount}</strong>
          <span>Matches</span>
        </div>
        <div>
          <strong>{seriesCount}</strong>
          <span>Series</span>
        </div>
        <div>
          <strong>{featuredMatch?.state || currentTab.state}</strong>
          <span>Status</span>
        </div>
      </section>

      <section className="live-match">
        <div className="section-header">
          <div>
            <span className="eyebrow">Now Playing</span>
            <h3>{currentTab.label} Matches</h3>
          </div>
          <span>{matchCount} matches</span>
        </div>

        {isLoading && (
          <div className="state-card">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
          </div>
        )}

        {!isLoading && error && <div className="state-card error">{error}</div>}

        {!isLoading && !error && filteredMatches.length === 0 && (
          <div className="state-card">
            No {currentTab.label.toLowerCase()} matches available right now.
          </div>
        )}

        {!isLoading &&
          !error &&
          filteredMatches.map((match) => (
            <MatchCard key={match.matchId} match={match} />
          ))}
      </section>

      <section className="quick-actions">
        <button
          className={activeTab === "live" ? "active-action" : ""}
          onClick={() => setActiveTab("live")}
          type="button"
        >
          Live {liveCount}
        </button>
        <button
          className={activeTab === "preview" ? "active-action" : ""}
          onClick={() => setActiveTab("preview")}
          type="button"
        >
          Preview {previewCount}
        </button>
      </section>

      <BottomNav />
    </div>
  );
};

export default Home;
