import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const MatchesTableRow = ({ tournamentId, match }) => {
  const startDate = new Date(match.startdate);
  const score = match.state === "Pendiente" ? "---" : `${match.goalsteam1}-${match.goalsteam2}`
  return (
    <tr className="rowClass">
      <td>
        <Link to={`/tournaments/${tournamentId}/${match.id}`}>
          <Button variant="link">
            {match.firstTeam} vs {match.secondTeam}
          </Button>
        </Link>
      </td>
      <td>
        {startDate.toLocaleDateString("es-UK", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td>
        {match.starttime}
      </td>
      <td>{match.location}</td>
      <td>{match.state}</td>
      <td>{score}</td>
    </tr>
  );
};

export default MatchesTableRow;
