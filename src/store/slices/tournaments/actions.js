import { tournamentsActions } from "./tournaments";
import {
  postTournament,
  getTournaments,
} from "../../../services/api.tournaments";
import { toast } from "react-toastify";

export const parseTournaments = (tournaments) => {
  const parsedTournaments = tournaments.map((tournament) => {
    return { ...tournament, value: tournament.id, label: tournament.name };
  });
  return parsedTournaments;
};

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

      let response;
      response = await postTournament(tournamentBody);
      if (!response.ok) {
        const resError = await response.json();
        throw new Error(resError.error);
      }

      response = await getTournaments(); //get Tournaments from API
      if (!response.ok) throw new Error("Couldn't fetch tournaments data");

      toast.success("Torneo creado con exitosamente", { theme: "light" });
      let tournaments = await response.json();
      tournaments = parseTournaments(tournaments);

      //update tournaments state
      dispatch(tournamentsActions.setTournaments(tournaments));
    } catch (error) {
      toast.error(
        "Error en el servidor. La tarea no se pudo completar"
      );
      console.log(error);
    }
  };
};
