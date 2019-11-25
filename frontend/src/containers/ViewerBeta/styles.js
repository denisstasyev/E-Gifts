import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  button: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));
