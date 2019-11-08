import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  views: {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden"
  },
  image: {
    width: "100%"
  },
  mobileStepper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  details: {
    width: "100%"
  },
  chip: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  price: {
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(2)
  },

  stepper: {
    backgroundColor: theme.palette.background.default
  },
  step: {
    marginBottom: theme.spacing(1)
  },

  uniqueLink: {
    backgroundColor: theme.palette.secondary.main, //TODO
    borderRadius: 5,
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));
