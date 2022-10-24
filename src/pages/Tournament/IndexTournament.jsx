import React, { useState } from "react";
import Tournament1 from "./Tournament1";
import Tournament2 from "./Tournament2";

const FIRST = 0;
const SECOND = 1;
const THIRD = 2;

/**
 * Creates new or edited tournament object that will be sent to database
 * Handles rendering logic of form steps
 */
const IndexTournament = ({ oldTournament }) => {
  /**
   * Sets @tournament object initial values.
   * If tournament already existed, it returns the same object
   * If null, creates a new object with initial values
   * @param {Object} tournament
   * @returns {Object} tournament object to be edited in form
   */
  const initTournament = (tournament) => {
    const newTournament = {
      name: "",
      startDate: null,
      endDate: null,
      type: "",
      teams: [],
      phases: [],
      rules: "",
    };

    return !!tournament ? tournament : newTournament;
  };

  // new tournament object
  const [tournament, setTournament] = useState(initTournament);

  /**
   * Updates tournament object. Updates fields and values passed as object
   * Example: updatedRequest({name: "WC", type:"selecciones"})
   * @param {Object} updatedFields
   */
  const updateTournament = (updatedFields) => {
    setTournament({ ...tournament, ...updatedFields });
  };

  // form's current step
  const [step, setStep] = useState(FIRST);

  const resetStep = () => setStep(FIRST);
  const nextStep = () => {
    setStep((last) => last + 1);
  };

  switch (step) {
    case FIRST:
      return (
        <Tournament1
          tournament={tournament}
          updateTournament={updateTournament}
          nextStep={nextStep}
        ></Tournament1>
      );

    case SECOND:
      return (
        <Tournament2
          tournament={tournament}
          updateTournament={updateTournament}
          nextStep={resetStep}
          lastStep={resetStep}
        ></Tournament2>
      );

    default:
      return (
        <Tournament1
          tournament={tournament}
          updateTournament={updateTournament}
          nextStep={nextStep}
        ></Tournament1>
      );
  }
};

export default IndexTournament;
