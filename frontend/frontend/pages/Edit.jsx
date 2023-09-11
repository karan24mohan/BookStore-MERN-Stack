/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");

  async function getSingleBookData() {
    let response = await fetch(`http://localhost:3444/book/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setTitle(data.data.title);
    setAuthor(data.data.author);
    setPublishedYear(data.data.publishedYear);
  }
  useEffect(() => {
    getSingleBookData();
  }, []);

  async function handleSaveChanges() {
    const response = await fetch(
      `http://localhost:3444/book/edit/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title,
          author,
          publishedYear,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    navigate("/");
  }

  return (
    <>
      <h1>Edit Book</h1>
      <form action="#" className="w-50 m-auto border border-black rounded p-3">
        <div className="d-flex flex-column mb-3">
          <label htmlFor="title">Title</label>
          <input
            className="p-2"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="d-flex flex-column mb-3">
          <label htmlFor="author">Author</label>
          <input
            className="p-2"
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column mb-3">
          <label htmlFor="publishedYear">Published Year</label>
          <input
            className="p-2"
            type="text"
            name="publishedYear"
            id="publishedYear"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSaveChanges}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Edit;
