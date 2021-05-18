import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function ProductPrewiev({ productItem }) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const { name: title, description, imageUrl, count, id } = productItem;
  const deleteItemHandler = () => {
    axios
      .delete(`/data/${id}.json`)
      .then((res) => {
        dispatch({type:"DELETE_ITEM",id:id})
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Card className={classes.root + " product-item"}>
      <CardActionArea>
        <CardMedia className={classes.media} image={imageUrl} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography component="h5">quantity : {count}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={"/productPage/" + id}>More Info</Link>
        </Button>
        <Button size="small" color="primary" onClick={deleteItemHandler}>
          Delete item
        </Button>
      </CardActions>
    </Card>
  );
}
