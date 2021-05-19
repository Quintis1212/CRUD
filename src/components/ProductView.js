import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from './Modal'
import Comments from './Comments'

const useStyles = makeStyles({
    root: {
      maxWidth: "80%",
      paddingBottom:"10%",
    },
    media: {
      height: 440,
    },
  });


export default function ProductView() {

  const classes = useStyles();

  const location = window.location.href.split("/").pop()
  const content = useSelector((data) => data.contentData);
  const item = content.find(el=>""+el.id === ""+location)
  const { name: title, description, imageUrl, count ,comments,weight,size:{height,width} } = item;
  return (
    <Card className={classes.root+" product-item"}>
      <Modal mode={"edit"} item={item}/>
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
          <Typography component="h5">weight : {weight}g</Typography>
          <Typography component="h5">height : {height}</Typography>
          <Typography component="h5">width : {width}</Typography>
        </CardContent>
      </CardActionArea>
      <Comments comments={comments} id={location}/>

    </Card>
  );
}
