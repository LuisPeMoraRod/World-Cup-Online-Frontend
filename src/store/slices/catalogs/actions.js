import { catalogsActions } from "./catalogs";
import { tournamentsActions } from "../tournaments/tournaments";
import { getTeams } from "../../../services/api.teams";
import { getTournaments, getTypes } from "../../../services/api.tournaments";

const NATIONAL_TEAMS = 1;
const TEAMS = 2;

export const fetchCatalogs = () => {
  return async (dispatch) => {
    try {
      let response;
      response = await getTeams(NATIONAL_TEAMS); // get Teams from API
      if (!response.ok) throw new Error("Couldn't fetch national teams data");
      const nationalTeams = await response.json();

      response = await getTeams(TEAMS); // get Teams from API
      if (!response.ok) throw new Error("Couldn't fetch national teams data");
      const teams = await response.json();

      response = await getTypes(); // get tournament types from API
      if (!response.ok) throw new Error("Couldn't fetch types data");
      const types = await response.json();

      response = await getTournaments(); //get Tournaments from API
      if (!response.ok) throw new Error("Couldn't fetch tournaments data");
      const tournaments = await response.json();

      //dispatch reducers to update state
      dispatch(catalogsActions.setNationalTeams(nationalTeams));
      dispatch(catalogsActions.setTeams(teams));
      dispatch(catalogsActions.setTypes(types));
      dispatch(tournamentsActions.setTournaments(tournaments));
    } catch (error) {
      console.log(error);
    }
  };
};
