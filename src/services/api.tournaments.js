import config from "../config";

export const postTournament = async (tournament) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(tournament),
  };

  return fetch(config.resources.tournaments, options)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

export const getTournaments = async () => {
  const options = {
    method: "GET",
  };

  return fetch(config.resources.tournaments, options)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

export const getTypes = async () => {
  const options = {
    method: "GET",
  };

  return fetch(config.resources.types, options)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

export const getMatchesInTournament = async (tournamentId) => {
  const options = {
    method: "GET",
  };

  return fetch(
    config.resources.tournaments.concat(`/${tournamentId}/Matches`),
    options
  )
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};
