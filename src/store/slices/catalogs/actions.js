import { catalogsActions } from "./catalogs";
import { getTeams } from "../../../services/api";

export const fetchCatalogs = () => {
  return async (dispatch) => {
    try {
      let response;
      response = await getTeams(); // get Teams from API
      if (!response.ok) throw new Error("Couldn't fetch teams data");
      const teams = await response.json();

      console.log(teams);
      dispatch(catalogsActions.setTeams(teams)); //dispatch reducer to update state
    } catch (error) {
      console.log("TODO: add toast notif for error");
    }
  };
};
