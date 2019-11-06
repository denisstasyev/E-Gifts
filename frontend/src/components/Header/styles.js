import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  logoIcon: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(-2)
  }
}));
