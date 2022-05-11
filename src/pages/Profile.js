import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import warzoneLogo from "../wz-logo.png";
import { fontWeight } from "@mui/system";
import { Grid } from "@material-ui/core/";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(45),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderImage: "linear-gradient(0deg, #12c2e9, #c471ed, #f64f59) 1",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper2: {
    backgroundColor: "black",
    opacity: "90%",
    padding: "2em",
  },
  logo: {
    opacity: "100%",
    height: "100px",
    width: "100%",
  },
  titleText: {
    marginTop: "1em",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  userName: {
    marginTop: "1em",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  innerTitleText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    borderBottom: "2px solid white",
  },
  innerBodyText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const playerData = location.state;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Paper className={classes.paper2}>
          <img src={warzoneLogo} alt="Logo" className={classes.logo}></img>
          <form className={classes.form}>
            <Typography
              className={classes.userName}
              variant="h4"
              gutterBottom
              component="div"
            >
              {playerData.Username}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  className={classes.innerTitleText}
                  variant="h3"
                  gutterBottom
                  component="div"
                >
                  K/D
                </Typography>
                <Typography
                  variant="h3"
                  gutterBottom
                  component="div"
                  className={classes.innerBodyText}
                >
                  {playerData.kdRatio.toFixed(2)}
                </Typography>
                <Typography
                  className={classes.innerTitleText}
                  variant="h3"
                  gutterBottom
                  component="div"
                >
                  Kills
                </Typography>
                <Typography
                  variant="h3"
                  gutterBottom
                  component="div"
                  className={classes.innerBodyText}
                >
                  {playerData.lifetimeKill}
                </Typography>
                <Typography
                  className={classes.innerTitleText}
                  variant="h3"
                  gutterBottom
                  component="div"
                >
                  Wins
                </Typography>
                <Typography
                  variant="h3"
                  gutterBottom
                  component="div"
                  className={classes.innerBodyText}
                >
                  {playerData.wins}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.innerTitleText}
                  variant="h3"
                  gutterBottom
                  component="div"
                >
                  Level
                </Typography>
                <Typography
                  className={classes.innerBodyText}
                  variant="h3"
                  gutterBottom
                  component="div"
                >
                  {playerData.level}
                </Typography>
                <Typography
                  className={classes.innerTitleText}
                  variant="h3"
                  gutterBottom
                  component="div"
                >
                  Deaths
                </Typography>
                <Typography
                  className={classes.innerBodyText}
                  variant="h3"
                  gutterBottom
                  component="div"
                >
                  {playerData.lifetimeDead}
                </Typography>
                <Typography
                  className={classes.innerTitleText}
                  variant="h3"
                  gutterBottom
                  component="div"
                >
                  TOP 5
                </Typography>
                <Typography
                  className={classes.innerBodyText}
                  variant="h3"
                  gutterBottom
                  component="div"
                >
                  {playerData.topFive}
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="white"
              className={classes.submit}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
          </form>
        </Paper>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Profile;
