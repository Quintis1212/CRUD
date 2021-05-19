import Typography from "@material-ui/core/Typography";
import axios from '../axios';
import { useDispatch } from "react-redux";



export default function Comments({ comments , id }) {
    const dispatch = useDispatch();

    const deleteComment = (i) => {
        axios
        .delete(`/data/${id}/comments/${i}.json`)
        .then((res) => {
          console.log(res);
          alert("Comment was deleted");
         // dispatch({ type: "ADD_ITEM", item: {...data,comments:[]}});
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return (
        <>
            {(comments.filter(Boolean) || []).map(({ description, date }, i) => {
                return (<div key={date + i} className="comments">
                    <Typography component="h5">Comment :</Typography>
                    <Typography component="h6">{description}</Typography>
                    <Typography component="h6">Date : {date}</Typography>
                    <button onClick={()=>deleteComment(i)} >Delete comment</button>
                </div>)
            })}
        </>
    )
}
