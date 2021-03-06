import { useState, useContext } from "react";
import UserContext from "../userContext";
import FlashMessage from "../common/FlashMessage";

/** AddKidForm component
 *
 * context - handleUserUpdate
 * state - formData
 *
 */

function AddKidForm() {

  const { handleAddKid } = useContext(UserContext);
  const initialState = { first_name: "", last_name: "", birth_date: "", classroom: "" };
  const [formData, setFormData] = useState(initialState);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    await handleAddKid(formData);
    setFormData(initialState);
    setHasSubmitted(true);
  }

  /** Create form fields  */
  function renderFormFields() {
    const formFields = Object.keys(formData);
    return formFields.map((f) => (
      <div className="p-1" key={f}>
        <input
          id={f}
          name={f}
          disabled={f === "username"}
          className="form-control"
          placeholder={`Enter ${f}...`}
          onChange={handleChange}
          value={formData[f]}
          aria-label={f}
        />
      </div>
    ));
  }

  function renderFlashMessage() {
    return hasSubmitted ? (
      <FlashMessage message="Updated successfully!" alertStatus="success" />
    ) : (
      ""
    );
  }

  return (
    <form className="UpdateUserForm" onSubmit={handleSubmit}>
      <h2 className="mt-2">Add A New Kid!</h2>
      <div className="mb-3 col-md-6 mx-auto mt-3">
        {renderFormFields()}
        {renderFlashMessage()}
        <button className="btn btn-info mt-3">Add</button>
      </div>
    </form>
  );
}

export default AddKidForm;