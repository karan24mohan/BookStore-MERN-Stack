/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Show = () => {
  const params = useParams();
  const [singleBook, setSingleBook] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getSingleBookData() {
    let response = await fetch(`http://localhost:3444/book/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setSingleBook(data);
    setLoading(false);
  }
  useEffect(() => {
    getSingleBookData();
  }, []);
  return (
    <>
      {loading ? (
        <FaSpinner />
      ) : (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{singleBook.data.title}</h5>
            <p className="card-text">{singleBook.data.author}</p>
            <p className="card-text">{singleBook.data.publishedYear}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Show;
