import config from "../config";

export const getTeams = async (type) => {
  const options = {
    method: "GET",
  };

  return fetch(config.resources.teams.concat(`/Type/${type}`), options)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};
