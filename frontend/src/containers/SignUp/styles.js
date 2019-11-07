import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  alert: {
    color: "red",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(2, 0, 2)
  }
}));
