import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  filter: {
    position: "fixed",
    bottom: theme.spacing(9),
    left: theme.spacing(2)
  }
}));
