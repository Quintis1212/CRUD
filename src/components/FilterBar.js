import { useSelector } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 100,
    },
  },
}));

export default function FilterBar() {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const uniqueNames = useSelector((data) => data.uniqueNames);
  const dispatch = useDispatch();
  const eventHandler = (e) => {
    const itemName = e.target.value;
    dispatch({ type: "FILTER_DATA", itemName: itemName });
  };
  const quantityHandler = (e) => {
    const itemVal = parseInt(e.target.value);

    if (!Number.isNaN(itemVal) && itemVal > 0) {
      setQuantity(itemVal);
      dispatch({ type: "FILTER_DATA", quantity: itemVal });
    } else {
      e.preventDefault();
    }
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Filters :</FormLabel>
      <FormGroup aria-label="position" column="true">
        {uniqueNames.map((el) => {
          return (
            <div key={el}>
              <FormControlLabel
                value={el}
                control={<Checkbox color="primary" />}
                label={el}
                labelPlacement="end"
                onChange={eventHandler}
              />
            </div>
          );
        })}
      </FormGroup>
      <form className={classes.root} autoComplete="off">
        <TextField
          id="standard-basic"
          label="Quantity"
          size="small"
          type="number"
          value={quantity}
          onChange={quantityHandler}
        />
      </form>
    </FormControl>
  );
}
