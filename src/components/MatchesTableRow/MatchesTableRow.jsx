import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const MatchesTableRow = ({ tournament: match }) => {
  return (
    <tr className="rowClass">
      <td>
        <Link to={`/matches/${match.id}`}>
          <Button variant="link">
            {match.firstTeam} vs {match.secondTeam}
          </Button>
        </Link>
      </td>
      <td>{match.startdate}</td>
      <td>{match.starttime}</td>
      <td>{match.location}</td>
      <td>{match.state}</td>
      <td>{match.score}</td>
    </tr>
  );
};

export default MatchesTableRow;
