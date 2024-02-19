import { devLog } from "./errorUtils";

/**
 * Utility function to submit a form on pressing the Enter key.
 *
 * @param {KeyboardEvent} e - The keyboard event object.
 * @param {Function} handleSubmit - The function to handle form submission.
 */
export const submitOnEnterClick = (e, handleFormSubmit) => {
  if (e.key === "Enter") {
    devLog("Enter key pressed");
    handleFormSubmit(e);
  }
};
