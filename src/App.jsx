import { useState } from "react";

import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [state, setState] = useState(() => {
    if (localStorage.getItem("Comments")) {
      return JSON.parse(localStorage.getItem("Comments"));
    }
    return [];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prv) => {
      localStorage.setItem(
        "Comments",
        JSON.stringify([
          { email, comment, date: new Date().toLocaleString() },
          ...prv,
        ])
      );
      return [{ email, comment, date: new Date().toLocaleString() }, ...prv];
    });
    setEmail("");
    setComment("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "#ebebeb",
          padding: "1rem 3rem",
          borderRadius: "5px",
          width: "20rem",
        }}
      >
        <h3>Comments</h3>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          id="email"
          type="text"
          onChange={handleEmail}
          style={{ padding: "0.3rem" }}
        />
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={handleComment}
          style={{ height: "20vh", padding: "0.5rem" }}
        />
        <button>Send Comment</button>
        <hr />
        {state.length > 0 ? (
          state?.map((ele, i) => {
            return (
              <div key={i}>
                <h5>{ele.email}</h5>
                <p>{ele.comment}</p>
                <span>{ele.date}</span>
              </div>
            );
          })
        ) : (
          <p style={{ borderBottom: "1px solid black" }}>
            Seja o primeiro a comentar!
          </p>
        )}
      </form>
    </>
  );
}

export default App;
