import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  topic: {
    marginBottom: theme.spacing(1)
  },
  gridList: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: theme.palette.background.paper
  }
}));
