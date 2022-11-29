import { useState } from "react";

/**
 * Hook to handle validations for Multi-Typeahead components
 * @param {*} updateObject updates request values
 * @param {*} checkInput check if entered text is valid
 * @param {String} field input type
 * @param {String} defaultValues
 * @param {any} comparisonValue optional value used to compare input value if necessary
 */
const useTypeaheadMulti = (
  updateObject,
  checkInput,
  field,
  defaultValues,
  comparisonValue = null
) => {
  const [enteredValues, setEnteredValues] = useState("");
  const [isTouched, setIsTouched] = useState(false); //state that indicates if input is touched

  /**
   * Updates state on option selection
   * @param {event} event
   */
  const valueSelectedHandler = (event) => {
    const lastSelection = event.slice(-1).pop();
    console.log(lastSelection);
    const items = !!lastSelection
      ? event.map((item) =>
          item.playerId
            ? { id: item.playerId, label: item.label } //condition for multiple players selections
            : { id: item.id, label: item.label }
        )
      : event.slice(0, -1);
    updateObject({ [field]: items });
    setEnteredValues(items);
  };

  /**
   * Updates state that indicates if input is touched
   * @param {*} event
   */
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  // let isValid;
  // if (!comparisonValue) isValid = checkInput(enteredValues) || checkInput(defaultValues);
  // else isValid = checkInput(enteredValues, comparisonValue) || checkInput(defaultValues, comparisonValue);

  const isValid = !comparisonValue
    ? checkInput(enteredValues) || checkInput(defaultValues)
    : checkInput(enteredValues, comparisonValue) ||
      checkInput(defaultValues, comparisonValue);

  const hasError = !isValid && isTouched;

  return {
    values: enteredValues,
    isValid,
    hasError,
    valueSelectedHandler,
    inputBlurHandler,
  };
};

export default useTypeaheadMulti;
