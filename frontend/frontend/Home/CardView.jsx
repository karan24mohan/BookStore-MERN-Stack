/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const CardView = ({ booksData }) => {
  const [itemId, setItemId] = useState("");

  async function handleDelete() {
    const deleteResponse = await fetch(
      `http://localhost:3444/book/deleteBook/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = deleteResponse;
    window.location.reload();
  }
  return (
    <>
      <div className="row ">
        {booksData.map((book, index) => {
          return (
            <div className="col-md-4 mt-3" key={index}>
              <div className="card position-relative">
                <div className="card-body">
                  <h5 className="card-title mb-3">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {book.author}
                  </h6>
                  <p className="card-text">
                    <b>Created At </b>
                    {book.createdAt}
                  </p>
                  <p className="card-text">
                    <b>Updated At </b>
                    {book.updatedAt}
                  </p>

                  <div className="d-flex align-items-center justify-content-center mt-3 gap-3">
                    <Link to={`book/${book._id}`}>
                      <BsInfoCircle className="text-warning fw-bold fs-3 cursor" />
                    </Link>
                    <Link to={`book/edit/${book._id}`}>
                      <AiOutlineEdit className="text-info fw-bold fs-3 cursor" />
                    </Link>
                    <span>
                      <MdOutlineDelete
                        className="text-danger fw-bold fs-3 cursor"
                        onClick={() => setItemId(book._id)}
                        data-bs-toggle="modal"
                        data-bs-target="#deleteBook"
                      />
                    </span>
                  </div>
                </div>
                <div
                  className="position-absolute"
                  style={{ right: "10px", top: "10px" }}
                >
                  <span className="badge text-bg-success">
                    {book.publishedYear}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="modal fade"
        id="deleteBook"
        tabIndex="-1"
        aria-labelledby="deleteBookLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteBookLabel">
                Are you sure you want to delete the book record!
              </h1>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="submit"
                className="btn btn-success"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardView;
