import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  stepper: {
    backgroundColor: theme.palette.background.default
  },
  step: {
    marginLeft: theme.spacing(1)
  },
  topic: {
    marginBottom: theme.spacing(1)
  },
  gridList: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: theme.palette.background.paper
  }
}));
