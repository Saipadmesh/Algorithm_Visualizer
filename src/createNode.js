import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { OrangeButton } from "./muiCustomStyle";
import Popup from "./Popup";

const CreateNode = (props) => {
  // for handling popup messages
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [message, setMessage] = useState("");

  // adding node

  const [inputs, setInputs] = useState({
    "name": null,
  });
  const [checkName, setcheckName] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  let text1 = useRef(null);
  let text2 = useRef(null);
  const handleReset = () => {
    text1.current.value = "";
    text2.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var i;
    for (i = 0; i < props.nodes.length; i++) {
      if (props.nodes[i].name === inputs.name) {
        setcheckName(true);
        return;
      }
    }

    var toSend = { "node": inputs };
    /*fetch("/addnode", {
      "method": "POST",

      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(toSend),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setMessage(json.message);
        console.log(json.check_var);
        if (!json.check_var) {
          props.onChange(inputs);
        } else {
          togglePopup();
        }
        setcheckName(false);
        handleReset();
      })
      .catch((error) => {
        console.log(error);
      });*/
  };

  return (
    <div style={{ margin: 10 }}>
      <h2>Add Node</h2>
      <form onSubmit={handleSubmit} autoComplete="off" id="add-node-form">
        <FormControl sx={{ m: 1, width: "15ch" }}>
          <TextField
            required
            label="Name"
            name="name"
            inputRef={text1}
            value={inputs.name || ""}
            onChange={handleChange}
            variant="standard"
            error={checkName}
          />
          {checkName && <FormHelperText>Name already exists</FormHelperText>}
        </FormControl>

        <br />
        <FormControl sx={{ m: 1 }}>
          <OrangeButton variant="contained" type="submit">
            Add
          </OrangeButton>
        </FormControl>
      </form>
      {isOpen && (
        <Popup
          content={
            <>
              <p>{message}</p>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};

export default CreateNode;
