import React from "react";

const RankingsTableRow = ({ index, ranking }) => {
  return (
    <tr className="rowClass">
      <td>{index}</td>
      <td>{ranking.name}</td>
      <td>{ranking.score}</td>
    </tr>
  );
};

export default RankingsTableRow;
