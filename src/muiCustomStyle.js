import { styled } from "@mui/material/styles";
import { orange, grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/core/styles";

export const OrangeButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: orange[500],
  "&:hover": {
    backgroundColor: orange[700],
  },
}));

export const BlackButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: grey[500],
  "&:hover": {
    backgroundColor: grey[700],
  },
}));

export const useSelectStyle = makeStyles({
  select: {
    minWidth: 200,
    fontWeight: 200,
    borderStyle: "none",
    borderWidth: 2,
    borderRadius: 10,

    boxShadow: "0px 5px 8px -3px rgba(0,0,0,0.14)",
  },

  list: {
    "& ul": {
      width: 200,
      backgroundColor: "white",
    },
    "& li": {
      fontSize: 15,
    },
    "& li:hover": {
      background: orange[100],
    },
    "& li.Mui-selected": {
      color: "white",
      background: orange[400],
    },
    "& li.Mui-selected:hover": {
      background: orange[500],
    },
  },
});
