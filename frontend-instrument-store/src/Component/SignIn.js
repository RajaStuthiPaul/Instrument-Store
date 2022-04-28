import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import store from "./store";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Checkbox,
  Typography,
  Box,
} from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";

function SignIn() {
  const [username1, setUsername] = useState("");
  const [password1, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();

  const LoginUser = () => {
    const user = { username: username1, password: password1 };
    axios
      .post(`http://localhost:5000/login`, user)
      .then((res) => {
        if (res.data) {
          store.dispatch({ type: "loginSuccess", payload: res.data.user });
          console.log("Login Success");
          history("/home");
        } else {
          store.dispatch({ type: "loginFail" });
          console.log("Inval_id Username or Password");
          setMessage("Username or Password is Inval_id");
        }
      })
      .catch((err) => {
        store.dispatch({ type: "loginFail" });
        setMessage(err);
        console.log(err);
      });
  };

  return (
    <div>
      <Grid
        container
        minw_idth="100vh"
        style={{ border: "sol_id", minw_idth: "100%", height: "100vh" }}
      >
        <Grid item xs={12} md={8} lg={8}>
          <Box
            sx={{
              marginRight: "850px",
            }}
          >
            <Typography variant="h6">Instrument Store</Typography>
          </Box>
          <div style={{ marginTop: "135px" }} />
          <Typography variant="h2"> Login To Your Account </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "250px",
              marginRight: "250px",
              marginTop: "20px",
            }}
          >
            <TextField
              type="text"
              label="Username"
              variant="outlined"
              margin="normal"
              onChange={(e) => setUsername(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <div style={{ marginTop: "20px" }} />
            <Typography variant="h5" htmlFor="rememberMe">
              remember me
              <Checkbox
                type="checkbox"
                defaultChecked
                color="primary"
                value="lsRememberMe"
              ></Checkbox>
            </Typography>
            <Typography> {message} </Typography> <div style={{ height: 20 }} />
            <Button
              size="large"
              type="submit"
              onClick={LoginUser}
              color="primary"
              variant="contained"
            >
              Sign In
            </Button>
          </Box>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={4}
          lg={4}
          alignItems="center"
          direction="column"
          justifyContent="space-between"
          style={{
            color: "white",
            padding: 10,
            backgroundImage: `url('https://i.pinimg.com/736x/87/8c/7d/878c7d859694d9fabf7669e003bdead3.jpg')`,
          }}
        >
          <div />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minwidth: 300,
            }}
          >
            <Typography variant="h2"> New Here?</Typography>
            <div style={{ marginTop: "20px" }} />
            <Typography variant="h6">
              Sign Up and discover different kinds of New Instruments!
            </Typography>
            <div style={{ marginTop: "20px" }} />
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "yellow" }}
            >
              <Button variant="contained" color="default" size="large">
                Sign Up
              </Button>
            </Link>
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
}

export default SignIn;
