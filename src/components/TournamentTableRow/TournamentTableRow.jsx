import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const TournamentTableRow = ({ tournament }) => {
  const startDate = new Date(tournament.startDate);
  const endDate = new Date(tournament.endDate);
  return (
    <tr className="rowClass">
      <td>
        <Link to={`/tournaments/${tournament.id}/matches`}>
          <Button variant="link">{tournament.name}</Button>
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
        {endDate.toLocaleDateString("es-UK", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td>{tournament.type}</td>
    </tr>
  );
};

export default TournamentTableRow;
