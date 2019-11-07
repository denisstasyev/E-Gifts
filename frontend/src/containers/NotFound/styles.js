import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  text: {
    alignSelf: "flex-start"
  },
  fab: {
    marginTop: theme.spacing(1),
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row-reverse"
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));
