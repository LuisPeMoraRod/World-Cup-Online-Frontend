import React from "react";

const TableRowMatch = ({ match }) => {

    return (<tr className="rowClass">
        <td>
            {match.teamA + " vs " + match.teamB}
        </td>
        <td>
            {match.startDate}
        </td>
        <td>
            {match.startTime}
        </td>
        <td>
            {match.headquarters}
        </td>
        <td>
            {match.status}
        </td>
        <td>
            {match.score}
        </td>
    </tr>)
};

export default TableRowMatch;