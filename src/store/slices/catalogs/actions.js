import { catalogsActions } from "./catalogs";
import { getTeams } from "../../../services/api.teams";
import { getTournaments } from "../../../services/api.tournaments";

export const fetchCatalogs = () => {
  return async (dispatch) => {
    try {
      let response;
      response = await getTeams(); // get Teams from API
      if (!response.ok) throw new Error("Couldn't fetch teams data");
      const teams = await response.json();

      response = await getTournaments(); //get Tournaments from API
      if (!response.ok) throw new Error("Couldn't fetch tournaments data");
      const tournaments = await response.json();

      //dispatch reducers to update state
      dispatch(catalogsActions.setTeams(teams));
      dispatch(catalogsActions.setTournaments(tournaments));
    } catch (error) {
      console.log("TODO: add toast notif for error");
    }
  };
};
