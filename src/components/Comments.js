import Typography from "@material-ui/core/Typography";
import axios from "../axios";
import React from "react";

export default function Comments({ comments = [], id }) {
  const inputRef = React.useRef();
  //function for comment deleting by index in database
  const deleteComment = (i) => {
    axios
      .delete(`/data/${id}/comments/${i}.json`)
      .then((res) => {
        console.log(res);
        alert("Comment was deleted , please reload the page");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //function to add the comment , check input field and set date fr comment
  const addComment = () => {
    const commentText = inputRef.current.value;
    if (commentText.length > 0 && commentText.length < 50) {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();

      today =
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds() +
        mm +
        "/" +
        dd +
        "/" +
        yyyy;
      const data = {
        date: today,
        description: commentText,
        id: 2,
        productId: id,
      };
      axios
        .post(`/data/${id}/comments.json`, data)
        .then((res) => {
          console.log(res);
          alert("Comment was added , please reload the page to see changes");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Your comment is empty or very big");
    }
  };
  //Some keys can be not numbers in comment list on database
  comments = Object.values(comments);
  return (
    <>
      {(comments.filter(Boolean) || []).map(({ description, date }, i) => {
        return (
          <div key={date + i} className="comments">
            <Typography component="h5">Comment :</Typography>
            <Typography component="h6">{description}</Typography>
            <Typography component="h6">Date : {date}</Typography>
            <button onClick={() => deleteComment(i)}>Delete comment</button>
          </div>
        );
      })}
      <input ref={inputRef} type="text" />
      <button onClick={addComment}>Add comment</button>
    </>
  );
}
