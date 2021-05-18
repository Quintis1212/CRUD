import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const inputName = React.useRef(null);
  const inputURLIMG = React.useRef(null);
  const inputDes = React.useRef(null);
  const inputQuantity = React.useRef(null);
  const inputHeight = React.useRef(null);
  const inputWidth = React.useRef(null);
  const inputWeight = React.useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addItemHandler = () => {
      console.log(inputName.current.value)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        inputRef={inputName}
        label="Name of product"
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        inputRef={inputURLIMG}
        label="URL to image of your product"
        style={{ margin: 8 }}
        helperText="URL must be a link such as : https://..."
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        inputRef={inputDes}
        label="Description"
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        inputRef={inputQuantity}
        label="Quantity"
        defaultValue={1}
        className={classes.textField}
        helperText="Must be a number more or equal than 1"
        margin="dense"
        variant="outlined"
      />

      <TextField
        inputRef={inputHeight}
        label="Height"
        className={classes.textField}
        helperText="Must be a number"
        margin="dense"
        variant="outlined"
      />
      <TextField
        inputRef={inputWidth}
        label="Width"
        className={classes.textField}
        helperText="Must be a number"
        margin="dense"
        variant="outlined"
      />
      <TextField
        inputRef={inputWeight}
        label="Weight"
        className={classes.textField}
        helperText="Must be a number"
        margin="dense"
        variant="outlined"
      />
      <Button onClick={addItemHandler} variant="contained">
        Add
      </Button>

      <Button onClick={handleClose} variant="contained">
        Cancel
      </Button>
    </div>
  );

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Add product
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
