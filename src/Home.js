import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import warzoneLogo from "./wz-logo.png";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { List, ListItem } from "@material-ui/core";
const axios = require("axios");

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Jayden To
      </Link>
      {" " + new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  select: {
    width: "100%",
    textAlign: "center",
  },
  platformText: {
    textAlign: "center",
  },
  alert: {
    marginTop: "1em",
  },
  exampleBox: {
    marginTop: "1em",
    backgroundColor: "black",
    opacity: "90%",
    padding: "2em",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [platform, setPlatform] = useState("");
  const [name, setName] = useState("Nyxie#7848054");
  const [error, setError] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  async function searchPlayer(name, platform) {
    const url = `${process.env.REACT_APP_SV_URL}/api/cod/fullstat`;
    try {
      var response = await axios.post(url, {
        ID: name,
        platform: platform,
      });
      if (response) {
        return {
          data: response.data,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function searchButton(event) {
    localStorage.setItem("saveName", name);
    localStorage.setItem("savePlatform", platform);
    try {
      const request = await searchPlayer(name, platform);
      console.log(request.data.Message);
      if (request.data.Message === "Success") {
        navigate("./profile", {
          state: request.data,
        });
      } else if (request.data === "Not permitted: user not found") {
        setError("User not found!");
      } else if (request.data === "Not permitted: not allowed") {
        setError("User profile is private!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("saveName")) {
      setName(localStorage.getItem("saveName"));
    }
    if (localStorage.getItem("savePlatform")) {
      setPlatform(localStorage.getItem("savePlatform"));
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Paper className={classes.paper2}>
          <img src={warzoneLogo} alt="Logo" className={classes.logo}></img>
          {error && (
            <Alert
              variant="outlined"
              severity="error"
              className={classes.alert}
            >
              {error}
            </Alert>
          )}
          <form className={classes.form}>
            <Select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className={classes.select}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Select Platform</em>
              </MenuItem>
              <MenuItem value="acti">Activision</MenuItem>
              <MenuItem value="battle">Battlenet</MenuItem>
              <MenuItem value="psn">PSN</MenuItem>
              <MenuItem value="xbl">XBOX</MenuItem>
            </Select>
            <TextField
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              label="In game name"
              autoFocus
              textalign="center"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={(event) => {
                searchButton(event);
                event.preventDefault();
              }}
            >
              Search
            </Button>
          </form>
        </Paper>
        <Paper className={classes.exampleBox}>
          <Typography className={classes.platformText}>
            Example Profile
          </Typography>
          <List sx={{ listStyleType: "disc" }}>
            <ListItem>IGN: BoloTac#2479392 Platform: Activision </ListItem>
            <ListItem>IGN: Caedrius#2813 Platform: Battlenet </ListItem>
            <ListItem>IGN: chamusca_pmbc Platform: PSN </ListItem>
            <ListItem>IGN: vreguiar Platform: XBOX </ListItem>
          </List>
        </Paper>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
