import React from "react";

const TableRow = ({ tournament }) => {

    return (<tr className="rowClass">
        <td>
            {tournament.name}
        </td>
        <td>
            {tournament.startDate}
        </td>
        <td>
            {tournament.endDate}
        </td>
        <td>
            {tournament.type}
        </td>
    </tr>)
};

export default TableRow;