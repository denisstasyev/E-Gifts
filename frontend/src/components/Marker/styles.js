import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    // eslint-disable-next-line
    height: "calc(var(--vh, 1vh) * 100)",
    backgroundColor: "black"
  },
  markerImage: {
    width: "80%",
    maxWidth: "400px",
    maxHeight: "400px"
  },
  text: {
    color: "white",
    textAlign: "center",
    padding: "0 10px"
  }
}));
