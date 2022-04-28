import axios from "axios";
import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import Paginate from "./Paginate";
import NavBar from "./NavBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import store from "./store";
import Typography from "@mui/material/Typography";
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";

function Home() {
  const [search, setSearch] = useState("");
  const [instruments, setInstruments] = useState([]);
  const [attribute, setAttribute] = useState("ALL");
  const [latest, setLatest] = useState([]);
  const [books, setBooks] = useState([]);
  const addToCart = (item) => {
    store.dispatch({ type: "ADD_TO_CART", payload: { item: item } });
    console.log("book id :" + item._id + " is added to cart");
  };
  const addToFav = (item) => {
    store.dispatch({ type: "ADD_TO_FAV", payload: { item: item } });
    console.log("book id :" + item._id + " is added to favorites");
  };
  useEffect(() => {
    const latestData = async () => {
      let i = [];
      await axios
        .get(`http://localhost:5000/keyboard/`)
        .then((res) => {
          i = i.concat(res.data.at(-1));
          console.log(i);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`http://localhost:5000/guitar/`)
        .then((res) => {
          i = i.concat(res.data.at(-1));
          console.log(i);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`http://localhost:5000/drum/`)
        .then((res) => {
          i = i.concat(res.data.at(-1));
          console.log(i);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`http://localhost:5000/harmonium/`)
        .then((res) => {
          i = i.concat(res.data.at(-1));
          console.log(i);
        })
        .catch((err) => {
          console.log(err);
        });
        await axios
        .get(`http://localhost:5000/musicbook/`)
        .then((res) => {
          i = i.concat(res.data.at(-1));
          console.log(i);
        })
        .catch((err) => {
          console.log(err);
        });

      setLatest(i);
    };
    latestData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/musicbook`)
        .then((res) => {
          setBooks(res.data.slice(Math.max(res.data.length - 5, 0)));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const searchData = async () => {
    if ((attribute === "ALL") & (search === "")) {
      setInstruments([]);
      return;
    }

    if (attribute === "ALL") {
      let i = [];
      await axios
        .get(`http://localhost:5000/search/keyboard?name=${search}`)
        .then((res) => {
          i = i.concat(res.data);
          console.log(i);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`http://localhost:5000/search/guitar?name=${search}`)
        .then((res) => {
          i = i.concat(res.data);
          console.log(i);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`http://localhost:5000/search/drum?name=${search}`)
        .then((res) => {
          i = i.concat(res.data);
          console.log(i);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`http://localhost:5000/search/harmonium?name=${search}`)
        .then((res) => {
          i = i.concat(res.data);
          console.log(i);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`http://localhost:5000/search/musicbooks?name=${search}`)
        .then((res) => {
          i.concat(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setInstruments(i);
      return;
    }
    await axios
      .get(`http://localhost:5000/search/${attribute}?name=${search}`)
      .then((res) => {
        setInstruments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div >
      <NavBar />
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
            <label htmlFor="search"> </label>
            <Box
              sx={{
                minWidth: 100,
                marginRight: "5px",
              }}
            >
              <FormControl fullWidth size="small">
                <Select
                  id="search"
                  variant="outlined"
                  value={attribute}
                  onChange={(e) => setAttribute(e.target.value)}
                >
                  <MenuItem value="ALL">ALL</MenuItem>
                  <MenuItem value="keyboard">KEYBOARDS</MenuItem>
                  <MenuItem value="guitar">GUITARS</MenuItem>
                  <MenuItem value="harmonium">HARMONIUMS</MenuItem>
                  <MenuItem value="drum">DRUMS</MenuItem>
                  <MenuItem value="musicbooks">MUSIC BOOKS</MenuItem>
                </Select>
              </FormControl>
            </Box>
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
        {(attribute === "ALL") & (instruments.length === 0) ? (
          <div>
            {" "}
            <div className="slidercon">
              <Carousel>
                <Carousel.Item interval={3000}>
                  <div>
                    <img
                      width={0}
                      height={400}
                      alt="0x400"
                      className="d-block w-100"
                      src="./pics/91.jpg"
                    />
                  </div>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                  <img
                    width={0}
                    height={400}
                    alt="0x400"
                    className="d-block w-100"
                    src="./pics/92.jpg"
                  />
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                  <img
                    width={0}
                    height={400}
                    alt="0x400"
                    className="d-block w-100"
                    src="./pics/93.jpg"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Box sx={{ marginLeft: "-70%" }}>
              {" "}
              <b>BROWSE BY CATEGORY</b>
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
                marginBottom: "10px",
                marginLeft: "10%",
                marginRight: "10%",
              }}
            >
              <div className="card-wrapper">
                <div className="card1">
                  <div className="card-image">
                    <a href="/keyboard">
                      <img width="230px" height="375px" src="./pics/81.jpeg" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-wrapper">
                <div className="card1">
                  <div className="card-image">
                    <a href="/drum">
                      <img width="230px" height="375px" src="./pics/82.jpeg" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-wrapper">
                <div className="card1">
                  <div className="card-image">
                    <a href="/guitar">
                      <img width="230px" height="375px" src="./pics/80.jpeg" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-wrapper">
                <div className="card1">
                  <div className="card-image">
                    <a href="/harmonium">
                      <img width="230px" height="375px" src="./pics/84.jpg" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-wrapper">
                <div className="card1">
                  <div className="card-image">
                    <a href="/musicbooks">
                      <img width="230px" height="375px" src="./pics/83.jpeg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <Box sx={{ marginLeft: "-68%" }}>
              {" "}
              <b>NEW ARRIVALS</b>
            </Box>
            <br></br> <br></br>
            <div style={{ marginLeft: "12%" }}> 
              
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Grid container >
                  {latest.map((late, i) => (
                    <Grid item key={late._id} xs={3} md={2} lg={2}>
                    
                      <Card sx={{ width: 200, height: 375, backgroundColor: "black" }}>
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          height="140"
                          image={late.link}
                        />
                        <CardContent sx={{ height: 175 }}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            component="div"
                            color="common.white"
                          >
                            {late.name}
                          </Typography>
                          <Typography variant="body2" color="common.white">
                            ₹{late.price}
                          </Typography>
                        </CardContent>
                        <Box
                          sx={{
                            
                            marginBottom: "2px",
                            backgroundColor: "yellow"
                          }}
                        >
                          <Button style={{ color: "black" }} size="small" onClick={() => addToFav(late)}  >
                            <Typography variant="body2" style={{ fontWeight: 400 }} >Fav</Typography>
                          </Button>
                          </Box>
                          <Box
                          sx={{

                            backgroundColor: "orange"
                          }}
                        >
                          <Button style={{ color: "black" }} size="small" onClick={() => addToCart(late)}>
                          <Typography variant="body2" style={{ fontWeight: 400 }} >Add To Cart</Typography>
                          </Button>  
                        </Box>
                      </Card>
                     
                    </Grid>
                    
                  ))}
                  </Grid>
                </Box>
            
            </div>
            <br></br> <br></br>
            <img width="1500px" height="204px" src="./pics/85.jpg" />
            <br></br>
            <br></br>
            <Box sx={{ marginLeft: "-62.5%" }}>
              {" "}
              <b>NEWLY LAUNCHED BOOKS</b>
            </Box>
            <br></br>
            <div style={{ marginLeft: "12%" }}>
              
                <Box
                  
                  sx={{
                    display: "flex",
                  }}
                >
                  <Grid container >
                  {books.map((late, i) => (
                    <Grid item key={late._id} xs={10} md={2} lg={2}>
                      <Card sx={{ width: 200, height: 300,backgroundColor: "black" }}>
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          height="140"
                          image={late.link}
                        />
                        <CardContent sx={{ height: 100 }}>
                          <Typography gutterBottom variant="body2" component="div" color="common.white">
                            {late.name}
                          </Typography>
                          <Typography variant="body2" color="common.white">
                          ₹{late.price}
                          </Typography>
                        </CardContent>
                        
                          <Box  sx={{
                            
                            marginBottom: "2px",
                            backgroundColor: "yellow"
                          }}
                        > 
                          <Button style={{ color: "black" }} size="small"  onClick={() => addToFav(late)}>
                          <Typography variant="body2" style={{ fontWeight: 400 }} >Fav</Typography>
                          </Button>
                          </Box>
                          <Box  sx={{
                            backgroundColor: "orange"
                          }}
                        > 
                          <Button style={{ color: "black" }} size="small" onClick={() => addToCart(late)}>
                          <Typography variant="body2" style={{ fontWeight: 400 }} >Add To Cart</Typography>
                          </Button>
                          </Box>
                      </Card>
                    </Grid>
                    ))}
                  </Grid>
                </Box>
            </div>
            <br></br> <br></br>
          </div>
        ) : (
          <div>
            <Paginate items={instruments} Component={Product} />
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
