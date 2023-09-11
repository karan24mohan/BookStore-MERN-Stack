/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import TableView from "../Home/TableView";
import CardView from "../Home/CardView";

const Home = () => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showType, setShowType] = useState(true);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");

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

  async function postBook() {
    const response = await fetch("http://localhost:3444/book/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        author,
        publishedYear,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    window.location.reload();
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h1>Books List</h1>
        <MdOutlineAddBox
          className="fs-1 cursor"
          data-bs-toggle="modal"
          data-bs-target="#enterBook"
        />
      </div>

      <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
        <button className="btn btn-dark" onClick={() => setShowType(true)}>
          Table
        </button>
        <button className="btn btn-info" onClick={() => setShowType(false)}>
          Card
        </button>
      </div>

      {loading ? (
        <FaSpinner />
      ) : showType ? (
        <TableView booksData={booksData} />
      ) : (
        <CardView booksData={booksData} />
      )}

      {/* Modal */}
      <div
        className="modal fade"
        id="enterBook"
        tabIndex="-1"
        aria-labelledby="enterBookLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="enterBookLabel">
                Enter Book Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="d-flex flex-column mb-3">
                  <label htmlFor="title" className="mb-2">
                    Enter Book Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="p-1"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-column mb-3">
                  <label htmlFor="author" className="mb-2">
                    Enter Book Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    className="p-1"
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-column mb-3">
                  <label htmlFor="publishedYear" className="mb-2">
                    Enter Book Published Year
                  </label>
                  <input
                    type="text"
                    name="publishedYear"
                    id="publishedYear"
                    className="p-1"
                    onChange={(e) => setPublishedYear(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={postBook}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
