import axios from "axios";
import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const AddData = () => {
  const [warning, setWarning] = useState("");

  // Handle Search Limit in Add Page
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const [data, setData] = useState({
    event_type: "",
    web_hook: "",
    reimbursement_accepted: "",
    reimbursement_rejected: "",
  });
  const [errors, setErrors] = useState({
    event_type: "",
    web_hook: "",
  });

  // State Management to handel the Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalRetrieve = "Data Successfully Retrieved";

  const handelNavigate = () => {
    navigate("/");
  };

  const {
    event_type,
    web_hook,
    reimbursement_accepted,
    reimbursement_rejected,
  } = data;

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setWarning("");
    setErrors("");
  };

  // Function to handle the creation of a new project
  const AddNotes = async (e) => {
    e.preventDefault();

    console.log("try");
    try {
      await axios.post("http://localhost:7000/", data);
      handleShow();
      // console.log(`handleShow`);
    } catch (error) {
      if (error.response.status === 400) {
        console.log("Duplication");
        setWarning(error.response.data.error);
        if (modalRetrieve === error.response.data.error) {
          handleShow();
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="form-group d-flex flex-column container w-50 mt-5 p-0">
      <div className="mt-5">
        <h1>Add New Data</h1>
      </div>
      <form>
        <div className="mb-3 mt-3">
          <label className="py-2">
            <h4>Event Type</h4>
          </label>
          <select
            className="form-control"
            type="text"
            placeholder="Event Type"
            name="event_type"
            value={event_type}
            onChange={handleChange}
            id="my_input"
          >
            <option value={data.reimbursement_accepted}>
              Reimbursement Accepted
            </option>
            <option value={data.reimbursement_rejected}>
              Reimbursement Rejected
            </option>
          </select>

          {/* Render the warning message if it exists */}
          {warning && <div className="alert alert-danger">{warning}</div>}
        </div>

        <div className="mb-3">
          <label className="py-2">
          <h4>Web Hook</h4>
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Web Hook"
            name="web_hook"
            value={web_hook}
            onChange={handleChange}
            id="my_input"
          />
          {errors.web_hook && (
            <div className="alert alert-danger">{errors.web_hook}</div>
          )}
        </div>
      </form>

      <div className="d-flex">
        <div className="mb-3 m-2">
          <Button variant="primary" type="submit" onClick={AddNotes}>
            Add
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Record Added successfully!</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handelNavigate}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="mb-3 m-2">
          <button className="btn btn-primary" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddData;
