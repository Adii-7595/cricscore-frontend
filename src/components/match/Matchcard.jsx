import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const MatchCard = ({ match }) => {
  const fallbackScore =
    match.state === "Preview" ? "Yet to bat" : "Score unavailable";
  const updatedAt = match.lastUpdated
    ? new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
      }).format(new Date(match.lastUpdated))
    : "Live now";

  return (
    <article className="match-card">
      <div className="match-card__top">
        <span className="live-pill">{match.state || "Live"}</span>
        <span className="match-card__time">{updatedAt}</span>
      </div>

      <p className="match-card__series">{match.series}</p>

      <div className="match-card__teams">
        <div className="team-row">
          <div className="team-name">
            <span className="team-badge">
              {match.team1?.slice(0, 1) || "T"}
            </span>
            <span>{match.team1}</span>
          </div>
          <strong>{match.team1Score || fallbackScore}</strong>
        </div>

        <div className="versus">vs</div>

        <div className="team-row">
          <div className="team-name">
            <span className="team-badge team-badge--alt">
              {match.team2?.slice(0, 1) || "T"}
            </span>
            <span>{match.team2}</span>
          </div>
          <strong>{match.team2Score || fallbackScore}</strong>
        </div>
      </div>

      <p className="match-card__status">{match.status}</p>

      <Link className="score-btn" to={`/match/${match.matchId}`}>
        Match Centre
        <FaChevronRight aria-hidden="true" />
      </Link>
    </article>
  );
};

export default MatchCard;
