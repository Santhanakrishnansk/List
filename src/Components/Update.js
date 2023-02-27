import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [warning, setWarning] = useState("");
  // console.log(warning);

  const handleGoBack = () => {
    navigate("/");
  };

  const [data, setData] = useState({
    event_type: "",
    web_hook: "",
    reimbursement_accepted: "",
    reimbursement_rejected: "",
  });

  // State Management for error validation
  const [errors, setErrors] = useState({
    event_type: "",
    web_hook: "",
  });
  const [originalData, setOriginalData] = useState({});

  // State Management to handel the Model
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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

  // Update request to specific data by id
  const updateNotes = async (e) => {
    e.preventDefault();

    console.log("try");
    try {
      await axios.put(`http://localhost:7000/${id}`, data);
      handleShow();
      console.log(`handleShow`);
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

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  // Load the existing user data in form to update
  const loadUser = () => {
    fetch(`http://localhost:7000/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setData({
          userId: result.id,
          event_type: result.event_type,
          web_hook: result.web_hook,
          reimbursement_accepted: result.reimbursement_accepted,
          reimbursement_rejected: result.reimbursement_rejected,
        });
        setOriginalData({
          userId: result.id,
          event_type: result.event_type,
          web_hook: result.web_hook,
          reimbursement_accepted: result.reimbursement_accepted,
          reimbursement_rejected: result.reimbursement_rejected,
        });
      })
      .catch((error) => console.log("error", error));
  };

  // Check for the update and block the update by disabled the update button
  const updateButtonDisabled = () => {
    if (
      originalData.event_type === event_type &&
      originalData.web_hook === web_hook &&
      originalData.reimbursement_accepted === reimbursement_accepted &&
      originalData.reimbursement_rejected === reimbursement_rejected
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="form-group d-flex flex-column container w-50 mt-5">
      <div className="mt-5">
        <h1>Update Data</h1>
      </div>
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

      <div className="d-flex">
        <div className="mb-3 m-2">
          <Button
            variant="primary"
            type="submit"
            onClick={updateNotes}
            disabled={updateButtonDisabled()}
          >
            Update
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Record updated successfully!</Modal.Body>
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

export default Update;
