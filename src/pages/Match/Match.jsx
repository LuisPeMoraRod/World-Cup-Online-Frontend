import React from "react";
import { useParams } from "react-router-dom";

const Match = () => {
  const { tournamentId, matchId } = useParams();

    return (
        <div className="centered">
            <h3 className="mb-3 fw-light">Team A vs Team B</h3>
            <h3>Tournament ID: {tournamentId}</h3>
            <h3>Match ID: {matchId}</h3>
        </div>
    );
};

export default Match;