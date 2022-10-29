import { tournamentsActions } from "./tournaments";
import {
  postTournament,
  getTournaments,
} from "../../../services/api.tournaments";

export const sendNewTournament = (tournament) => {
  return async (dispatch) => {
    try {
      //parse teams to get only IDs
      const teams = tournament.teams.map((team) => {
        return team.id;
      });

      const tournamentBody = {
        name: tournament.name,
        startdate: tournament.startDate,
        enddate: tournament.endDate,
        description: tournament.description,
        typeid: tournament.type.value,
        teamsIds: teams,
        phases: tournament.phases,
      };
      console.log(tournamentBody);
      let response;
      response = await postTournament(tournamentBody);
      if (!response.ok) {
        const resError = await response.json();
        throw new Error(resError.error);
      }

      response = await getTournaments(); //get Tournaments from API
      if (!response.ok) throw new Error("Couldn't fetch tournaments data");
      const tournaments = await response.json();

      //update tournaments state
      dispatch(tournamentsActions.setTournaments(tournaments));
    } catch (error) {
      console.log(error);
    }
  };
};
