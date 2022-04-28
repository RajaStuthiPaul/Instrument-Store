import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";
import NavBar from "./NavBar";
import Paginate from "./Paginate";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";

const Keyboard = ()=>{
   const [search, setSearch] = useState("");
    const[instruments,setInstruments] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/keyboard`)
        .then((res) => {
          setInstruments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  const searchData = async () => {
    await axios
      .get(`http://localhost:5000/search/keyboard?name=${search}`)
      .then((res) => {
        setInstruments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

    return(
        <div>
            <NavBar/>
<div style={{ marginTop: 20 }}>
        
            <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "360px",
              marginBottom: "10px",
            }}
          >
            <label htmlFor="search"> </label><label htmlFor="search"> </label>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                marginRight: "15px",
              }}
            >
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                type="text"
                label="search Products"
                onChange={(e) => setSearch(e.target.value)}
              ></TextField>
            </Box>

            <Box
              sx={{
                marginRight: "100px",
              }}
            >
              <Button
                size="large"
                variant="contained"
                type="submit"
                onClick={searchData}
                color="primary"
                startIcon={<SearchRounded />}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Box>
        </div>
           <Box sx={{marginRight:"75%", marginTop:"5%",marginBottom:"1%"}}> <b>KEYBOARDS</b></Box>
            <Paginate items={instruments} Component={Product} />
        </div>
    );
}

export default Keyboard;