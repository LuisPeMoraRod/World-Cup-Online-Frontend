import React, { useState } from "react";
import Match1 from "./Match1";

const FIRST = 0;

/**
 * Creates new or edited match object that will be sent to database
 * Handles rendering logic of form steps
 */
const IndexMatch = ({ oldMatch }) => {
  /**
   * Sets @match object initial values.
   * If match already existed, it returns the same object
   * If null, creates a new object with initial values
   * @param {Object} match
   * @returns {Object} match object to be edited in form
   */
  const initMatch = (match) => {
    const newMatch = {
        teamA: "",
        teamB: "",
        startDate: null,
        startTime: null,
        headquarters: "",
        stage: "",
    };

    return !!match ? match : newMatch;
  };

  // new match object
  const [match, setMatch] = useState(initMatch);

  /**
   * Updates match object. Updates fields and values passed as object
   * @param {Object} updatedFields
   */
  const updateMatch = (updatedFields) => {
    setMatch({ ...match, ...updatedFields });
  };

  // form's current step
  const [step, setStep] = useState(FIRST);

  const resetStep = () => setStep(FIRST);
  const nextStep = () => setStep((last) => last + 1);
      return (
        <Match1
          match={match}
          updateMatch={updateMatch}
          nextStep={nextStep}
        ></Match1>
      );
  
};
export default IndexMatch;
