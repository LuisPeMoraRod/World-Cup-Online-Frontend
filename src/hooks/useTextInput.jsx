import { useState } from "react";

/**
 * Hook to handle validations for text inputs
 * @param {*} updateTournament updates request values
 * @param {*} checkInput check if entered text is valid
 * @param {String} field input type
 * @param {String} defaultValue
 * @returns
 */
const useTextInput = (updateTournament, checkInput, field, defaultValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false); //state that indicates if input is touched

  /**
   * Updates state on every key stroke
   * @param {event} event
   */
  const valueChangedHandler = (event) => {
    setEnteredValue(event);
    updateTournament({ [field]: event });
  };

  /**
   * Updates state that indicates if input is touched
   * @param {*} event
   */
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const isValid = checkInput(enteredValue) || checkInput(defaultValue); //
  const hasError = !isValid && isTouched;

  return {
    value: enteredValue,
    isValid,
    hasError,
    valueChangedHandler,
    inputBlurHandler,
  };
};

export default useTextInput;
