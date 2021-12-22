import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { OrangeButton, BlackButton, useSelectStyle } from "./muiCustomStyle";
import Stack from "@mui/material/Stack";
import Popup from "./Popup";

const CreateRelationship = (props) => {
  // for handling popup messages
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [message, setMessage] = useState("");
  // other stuff
  const nodeList = props.nodes;
  let nameList = nodeList;

  const [selectedNode1, setSelectedNode1] = useState({});
  const handleChange1 = (event) => {
    setSelectedNode1(event.target.value);
  };

  const [selectedNode2, setSelectedNode2] = useState({});

  const handleChange2 = (event) => {
    setSelectedNode2(event.target.value);
  };

  const [err, setError] = useState(false);
  const addConnection = (event) => {
    event.preventDefault();
    if (selectedNode1 === selectedNode2) {
      setError(true);
    } else {
      var toSend = { node1: selectedNode1, node2: selectedNode2 };
      /*fetch("/addcon", {
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
          if (!json.check_var) {
            props.onChange([selectedNode1.name, selectedNode2.name]);
          } else {
            togglePopup();
          }
          //console.log(props.relationships);
        })
        .catch((error) => {
          console.log(error);
        });*/
    }
  };

  const delConnection = (event) => {
    event.preventDefault();
    if (selectedNode1 === selectedNode2) {
      setError(true);
    } else {
      var toSend = { node1: selectedNode1, node2: selectedNode2 };
      /*fetch("/delcon", {
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
          //console.log(json.check_var);
          if (json.check_var) {
            props.onDelete([selectedNode1.name, selectedNode2.name]);
          } else {
            togglePopup();
          }
        })
        .catch((error) => {
          console.log(error);
        });*/
    }
  };

  // selectField colors
  const classes = useSelectStyle();

  return (
    <div style={{ margin: 10 }}>
      <h2>Modify relationships</h2>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="combo1">Name</InputLabel>
        <Select
          labelId="combo1"
          id="1"
          value={selectedNode1}
          onChange={handleChange1}
          autoWidth
          label="Name"
          classes={{
            root: classes.select,
          }}
          MenuProps={{ classes: { paper: classes.list } }}
        >
          <MenuItem value={{}}>
            <em>None</em>
          </MenuItem>
          {nameList.map((node) => {
            //console.log(node);
            return (
              <MenuItem value={node} id={node.id}>
                {node.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <br />
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="combo2">Name</InputLabel>
        <Select
          labelId="combo2"
          id="2"
          value={selectedNode2}
          onChange={handleChange2}
          autoWidth
          label="Name"
          classes={{
            root: classes.select,
          }}
          MenuProps={{ classes: { paper: classes.list } }}
        >
          <MenuItem value={{}}>
            <em>None</em>
          </MenuItem>
          {nameList.map((node) => {
            //console.log(node);
            return (
              <MenuItem
                value={node}
                key={node.name}
                disabled={node === selectedNode1}
              >
                {node.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <br />
      {err === true && (
        <FormHelperText>You have unread messages.</FormHelperText>
      )}
      <br />

      <FormControl sx={{ m: 1 }}>
        <Stack direction="row" spacing={2}>
          <OrangeButton variant="contained" onClick={addConnection}>
            Add
          </OrangeButton>

          <BlackButton
            variant="contained"
            color="error"
            onClick={delConnection}
          >
            Delete
          </BlackButton>
        </Stack>
      </FormControl>
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
export default CreateRelationship;
