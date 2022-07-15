import { useState, useContext } from "react";
import UserContext from "../userContext";

function SchoolQueries() {
  const { handleSchoolQuery } = useContext(UserContext);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    chosenQuery: "Covid-Positive Student Class Contact List",
    id: ""
  });
  const [results, setResults] = useState([]);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setHasSubmitted(false);
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const queryResults = await handleSchoolQuery(formData);
    setResults(queryResults);
    setHasSubmitted(true);
  }

  return (
    <div className="row">
      <form className="SchoolQueriesForm mx-auto col-6" onSubmit={handleSubmit}>
        <label htmlFor="chosenQuery" className="form-label mt-4">Choose A Query</label>
        <select
          onChange={handleChange}
          className="form-select mt-2 mb-2"
          id="chosenQuery"
          value={formData.chosenQuery}
          name="chosenQuery"
        >
          <option>Covid-Positive Student Class Contact List</option>
          <option>Current County Data - Covid Act Now</option>
          <option>Combined Class List And County Data</option>
        </select>

        {formData.chosenQuery !== "Current County Data - Covid Act Now" ?
          <input
            id="id"
            name="id"
            className="form-control mt-3"
            placeholder="Enter student id"
            onChange={handleChange}
            value={formData["id"]}
          />
          :
          ""
        }
        <button className="btn btn-info w-25 mx-auto mt-3">Run</button>
      </form>
      {hasSubmitted && <section id="results" className="mt-5 row">
        <div className="mx-auto col-9 bg-white">
          <ol className="mx-auto col-6">
            <p></p>

            {formData.chosenQuery === "Covid-Positive Student Class Contact List"
              && results.length
              && results.map(
                student =>
                <p>
                  <li className="text-start ms-2" key={student.id}>
                    <strong>Student: </strong>{student.first_name} {student.last_name} <br />
                    <strong>Primary Contact: </strong> {student.primary_contact.name}
                    <ul>
                      <li> {student.primary_contact.relation}</li>
                      <li> {student.primary_contact.email}</li>
                      <li> {student.primary_contact.phone}</li>
                    </ul>
                  </li>
                </p>)}

            {formData.chosenQuery === "Current County Data - Covid Act Now" &&
              <>
                <strong>{results[1]["county"]} Current COVID Stats</strong>
                <li>CDC Transmission Level: {results[0].cdcTransmissionLevel}</li>
                <li>Test Positivity Ratio: {results[2].testPositivityRatio}</li>
                <li>Infection Rate: {results[3].infectionRate}</li>
                <li>Case Density: {results[4].caseDensity}</li>
              </>
            }
          </ol>
        </div>
      </section >}
    </div >);
}

export default SchoolQueries;