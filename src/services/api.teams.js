import config from "../config";

export const getTeams = async () => {
  const options = {
    method: "GET",
  };

  return fetch(config.resources.teams, options)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};
