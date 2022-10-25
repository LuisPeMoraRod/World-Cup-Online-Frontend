import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const TournamentTableRow = ({ tournament }) => {
  return (
    <tr className="rowClass">
      <td>
        <Link to={`/tournaments/${tournament.id}/matches`}>
          <Button variant="link">{tournament.name}</Button>
        </Link>
      </td>
      <td>{tournament.startDate}</td>
      <td>{tournament.endDate}</td>
      <td>{tournament.type}</td>
    </tr>
  );
};

export default TournamentTableRow;
