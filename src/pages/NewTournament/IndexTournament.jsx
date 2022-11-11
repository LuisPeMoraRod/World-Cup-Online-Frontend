import React, { useState } from "react";
import Tournament1 from "./Tournament1";
import Tournament2 from "./Tournament2";
import { useSelector } from "react-redux";
import {FIRST, SECOND} from "../../constants"
import Layout from "../../components/Layout/Layout";


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
      type: null,
      teams: [],
      phases: [],
      description: "",
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
    console.log(step);
    setStep((last) => last + 1);
  };

  switch (step) {
    case FIRST:
      return (
        <Layout>
        <Tournament1
          tournament={tournament}
          updateTournament={updateTournament}
          nextStep={nextStep}
        ></Tournament1>
        </Layout>
      );

    case SECOND:
      return (
        <Layout>
        <Tournament2
          tournament={tournament}
          updateTournament={updateTournament}
          nextStep={resetStep}
          lastStep={resetStep}
        ></Tournament2>
        </Layout>
      );

    default:
      return (
        <Layout>
        <Tournament1
          tournament={tournament}
          updateTournament={updateTournament}
          nextStep={nextStep}
        ></Tournament1>
        </Layout>
      );
  }
};

export default IndexTournament;
