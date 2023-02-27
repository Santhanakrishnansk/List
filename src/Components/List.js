import "../Components/Main.scss";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaRegPlusSquare } from "react-icons/fa";

const List = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const GoToAdd = () => {
    navigate("add/");
  };
  const GoToUpdate = (id) => {
    navigate("update/");
  };
  return (
    <div className="list_main_container px-4 pt-5 border d-flex justify-content-center align-items-start">
      <div className="list_sub_container d-flex flex-column w-100 rounded-1 shadow-sm">
        <div className="d-flex justify-content-between py-5 pe-2">
          <div className="ps-2">
            <h2>LIST</h2>
          </div>
          <div>
            <button
              className="rounded-2 p-2 btn-info border d-flex justify-content-end"
              onClick={() => {
                GoToAdd();
              }}
            >
              <FaRegPlusSquare />
            </button>
          </div>
        </div>
        <div className="px-2">
          <Table hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Event Type</th>
                <th>Web Hook</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Reimbursement Accepted</td>
                <td>Otto</td>
                <td className="narrow-heading">
                  <div className="d-flex justify-content-start">
                    <div className="update-button px-2">
                      <button
                        type="button"
                        className="btn btn-info btn-sm"
                        onClick={() => {
                          GoToUpdate();
                        }}
                      >
                        <FaEdit />
                      </button>
                    </div>
                    <div className="delete-button px-2">
                      <button
                        type="button"
                        className=" btn btn-info btn-sm"
                        /* onClick={() => {
                    setId(item.id);
                    handleShow();
                  }} */
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default List;
