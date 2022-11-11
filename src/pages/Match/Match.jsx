import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import config from "../../config";
import "./Match.scss";

const Match = () => {
  const { tournamentId, matchId } = useParams();

  const [team1, setTeam1] = useState("");
  const [goalsTeam1, setGoalsTeam1] = useState(0);
  const [team2, setTeam2] = useState("");
  const [goalsTeam2, setGoalsTeam2] = useState(0);
  const [oficialScore, setOficialScore] = useState("Pendiente");

  const setTeams = (matches) => {
    const match = matches.filter((match) => {
      return match.id == matchId;
    });
    setTeam1(match[0].name);
    setTeam2(match[1].name);
  };

  useEffect(() => {
    const options = {
      method: "GET",
    };
    //get match info
    fetch(
      config.resources.tournaments.concat(`/${tournamentId}/Matches`),
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Container className="centered">
      <h3 className="mb-5 mx-5
       fw-light">
        {team1} vs {team2}
      </h3>
      <div className="scores-container">
        <h4 className="mb-3 fw-light text-label"><strong>Mi predicción:</strong> {team1} {goalsTeam1} - {goalsTeam2} {team2}</h4>
        <h4 className="mb-3 fw-light text-label"><strong>Resultado oficial:</strong> {oficialScore}</h4>
      </div>
    </Container>
  );
};

export default Match;
