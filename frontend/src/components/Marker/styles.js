import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-arround",
    alignContent: "center",
    height: "100%",
    // eslint-disable-next-line
    height: "calc(var(--vh, 1vh) * 100)"
  },
  markerImage: {}
}));
