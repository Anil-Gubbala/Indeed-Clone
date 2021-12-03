import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Button,
  withStyles,
  InputAdornment,
  TextField,
  FormHelperText,
} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#f2f2f2",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  boxSearch: {
    backgroundColor: "white",
    margin: 0,
    height: "310px",
    backgroundPosition: "bottom right",
    backgroundImage: "url(/Images/companyreview.PNG)",
    backgroundRepeat: "no-repeat",
  },
  outerSearchGrid: {
    marginTop: "50px",
    flexDirection: "column",
    alignContent: "flex-end",
  },
  h3: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
  h5: {
    color: "#6f78a5",
    fontWeight: "400",
    marginBottom: "70px",
  },
  outlinedInput: {
    border: "2px solid #cccccc",
    borderRadius: "10px",
    width: "450px",
  },
  formhelperText: {
    color: "#085ff7",
    paddingLeft: "20px",
    cursor: "pointer",
  },
  companiesHiring: {
    marginTop: "50px",
    marginBottom: "20px",
    backgroundColor: "white",
    display: "flex",
  },
}));

export const SearchButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#085ff7",
    cursor: "pointer",
    width: "200px",
    borderRadius: "200px",
    height: "53px",
    marginLeft: "50px",
    "&:hover": {
      backgroundColor: "#0542ac",
    },
  },
}))(Button);
