import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from '../axios';
import { useDispatch } from "react-redux";

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

export default function SimpleModal({mode,item}) {
  mode = mode || "default"
  item = item || {}
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
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addItemHandler = () => {
    const inputNameVal = [inputName.current.value, "string"];
    const inputURLImgVal = [inputURLIMG.current.value, "URL"];
    const inputDesVal = [inputDes.current.value, "string"];
    const inputQuantityVal = [+inputQuantity.current.value, "number"];
    const inputHeightVal = [+inputHeight.current.value, "number"];
    const inputWeightVal = [+inputWeight.current.value, "number"];
    const inputWidthVal = [+inputWidth.current.value, "number"];

    const formCheck = (inputField, value) => {
      switch (value) {
        case "string":
          return inputField.length > 0 && inputField.length < 150;
        case "URL":
          return (inputField.match(/(jpg|gif|png)/) != null);
        case "number":
          return +inputField > 0 && +inputField < 100000;
        default:
          throw new Error("Some case was misspelled!");
        //console.log(inputField,value)
        // return false;
      }
    }

    const conditions = [inputNameVal, inputURLImgVal, inputDesVal, inputQuantityVal,
      inputHeightVal, inputWeightVal, inputWidthVal]
    const formIsValid = conditions.every(el => {
      if (formCheck(...el)) {
        return true;
      } else {
        alert(`Form input is not valid , ${el[0] || 'your currnet field'} must be a ${el[1] === "number" ? 'positive number, less that 10000 ' : el[1]} and not empty`)
        return false
      }

    })

    if (formIsValid) {
      const data =  {
          "count": inputQuantityVal[0],
          "description": inputDesVal[0],
          "imageUrl": inputURLImgVal[0],
          "name": inputNameVal[0],
          "size": {
            "height": inputHeightVal[0],
            "width": inputWidthVal[0],
          },
          "weight": inputWeightVal[0],
        }
    if(mode === "edit"){
      axios
        .patch(`/data/${item.id}.json`, data)
        .then((res) => {
          console.log(res);
          data.id = item.id
          dispatch({type:"UPDATE_ITEM", item: data});

          alert("Item was updated , check page for new item :)");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("/data.json", data)
        .then((res) => {
          console.log(res);
          alert("Item published , check page for new item :)");
          dispatch({ type: "ADD_ITEM", item: {...data,comments:[]}});
        })
        .catch((error) => {
          console.log(error);
        });
    }

    }
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
        defaultValue={item.name}
      />
      <TextField
        inputRef={inputURLIMG}
        label="URL to image of your product"
        style={{ margin: 8 }}
        helperText="URL must be a link such as : https://... and picture format (jpg|gif|png)"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={item.imageUrl}

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
        defaultValue={item.description}

      />
      <TextField
        inputRef={inputQuantity}
        label="Quantity"
        className={classes.textField}
        helperText="Must be a number more or equal than 1"
        margin="dense"
        variant="outlined"
        type="number"
        defaultValue={item.count||1}

      />

      <TextField
        inputRef={inputHeight}
        label="Height"
        className={classes.textField}
        helperText="Must be a number"
        margin="dense"
        type="number"
        variant="outlined"
        defaultValue={item?.size?.height}

      />
      <TextField
        inputRef={inputWidth}
        label="Width"
        className={classes.textField}
        helperText="Must be a number"
        margin="dense" 
        variant="outlined"
        type="number"
        defaultValue={item?.size?.width}
      />
      <TextField
        inputRef={inputWeight}
        label="Weight"
        className={classes.textField}
        helperText="Must be a number"
        margin="dense"
        variant="outlined"
        type="number"
        defaultValue={item.weight}

      />
      <div>
      <Button onClick={addItemHandler} variant="contained">
        Add
      </Button>
      </div>
      <div>

      <Button onClick={handleClose} variant="contained">
        Cancel
      </Button>
            </div>

    </div>
  );

  return (
    <div>
      <div>
      <Button onClick={handleOpen} variant="contained">
       {mode === "edit"? "Edit": "New product"} 
      </Button>
      </div>
      <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      </div>

    </div>
  );
}
