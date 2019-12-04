import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1000,
    width: "100%",
    position: "absolute",
    bottom: "0",
    backgroundColor: theme.palette.background.default
    // height: "56px"
  }
}));
