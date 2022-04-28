import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Typography,
  Box,
} from "@material-ui/core";

import { AccountCircle, LockRounded } from "@material-ui/icons";

function SignUp() {
  const [username1, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password1, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useNavigate();

  const SignUpUser = () => {
    const user = {
      username: username1,
      firstname:firstName,
      lastname:lastName,
      password: password1,
      orders: [],
    };
    if ((username1.length > 0) & (password1.length > 0)) {
      axios
        .post(`http://localhost:5000/users`, user)
        .then((res) => {
          console.log("user created successfully");
          history("/");
        })
        .catch((err) => {
          setMessage(err);
          console.log(err);
        });
    } else {
      if (username1.length === 0) {
        console.log("username should not be empty");
        setMessage("Username should not be empty");
      }
      if (password1.length === 0) {
        console.log("password should not be empty");
        setMessage("Password should not be empty");
      }
    }
  };

  return (
    <div>
      <Grid
        container
        style={{
          border: "solid",
          minwidth: "100%",
          height: "100vh",
        }}
      >
        <Grid item xs={12} md={8} lg={8}>
        <Box
            sx={{
              marginRight: "850px",
            }}
          >
            <Typography variant="h6">Instrument Store</Typography>
          </Box>
          <div style={{ marginTop: "75px" }} />
          <Typography variant="h2"> SignUp To Your Account </Typography>
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
              margin="normal"
              variant="outlined"
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
              type="text"
              label="First Name"
              margin="normal"
              variant="outlined"
              onChange={(e) => setFirstName(e.target.value)}
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
              type="text"
              label="Last name"
              margin="normal"
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
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
              margin="normal"
              variant="outlined"
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
            <Typography> {message} </Typography> <div style={{ height: 20 }} />
            <Button
              size="large"
              type="submit"
              onClick={SignUpUser}
              color="primary"
              variant="contained"
            >
              SignUp
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
            <Typography variant="h2" style={{ color: "white" }}>
              {" "}
              Already Here?
            </Typography>
            <div style={{ marginTop: "20px" }} />
            <Typography variant="h6" style={{ color: "white" }}>
              Sign In and explore through the Instrument Store to find your Favourite!
            </Typography>
            <div style={{ marginTop: "20px" }} />
            <Link to="/signin" style={{ textDecoration: "none", color: "yellow" }}>
              <Button variant="contained" color="default" size="large">
                Sign In
              </Button>
            </Link>
          </div>

          <div />
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUp;
