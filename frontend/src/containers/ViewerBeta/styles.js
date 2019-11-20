import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    height: "100%",
    minWidth: "400px",
    minHeight: "400px"
    // outline: "none"
  },
  viewer: {
    flexGrow: 1,
    // height: "100vh",
    width: "100%"
  },
  button: {
    backgroundColor: "white",
    borderRadius: "4px",
    border: "none",
    position: "absolute",
    top: "16px",
    right: "16px"
  }
}));
