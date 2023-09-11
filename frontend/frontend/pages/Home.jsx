/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";

const Home = () => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemId, setItemId] = useState("");

  async function fetchBooks() {
    const response = await fetch("http://localhost:3444/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setBooksData(data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

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
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <h1>Books List</h1>
          <MdOutlineAddBox className="fs-1 cursor" />
        </div>
        {loading ? (
          <FaSpinner />
        ) : (
          <table
            className="w-100 text-center mt-3"
            style={{ borderCollapse: "separate", borderSpacing: "10px" }}
          >
            <thead>
              <tr>
                <th className="border border-dark rounded">No</th>
                <th className="border border-dark rounded">Title</th>
                <th className="border border-dark rounded">Author</th>
                <th className="border border-dark rounded">Publish Year</th>
                <th className="border border-dark rounded">Operations</th>{" "}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {booksData.map((book, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-dark rounded">{index + 1}</td>
                    <td className="border border-dark rounded">{book.title}</td>
                    <td className="border border-dark rounded">
                      {book.author}
                    </td>
                    <td className="border border-dark rounded">
                      {book.publishedYear}
                    </td>
                    <td className="border border-dark rounded">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <Link to={`book/${book._id}`}>
                          <BsInfoCircle className="cursor" />
                        </Link>
                        <Link to={`book/edit/${book._id}`}>
                          <AiOutlineEdit className="cursor" />
                        </Link>
                        <span>
                          <MdOutlineDelete
                            onClick={() => setItemId(book._id)}
                            className="cursor"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteBook"
                          />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
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

export default Home;
