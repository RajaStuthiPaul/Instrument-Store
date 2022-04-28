import store from "./store";
import "./product.css";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";
function Product(props) {
  const instrument = props.instrument;

  const addToCart = (item) => {
    store.dispatch({ type: "ADD_TO_CART", payload: { item: item } });
    console.log("book id :" + item.id + " is added to cart");
  };

  const addToFav = (item) => {
    store.dispatch({ type: "ADD_TO_FAV", payload: { item: item } });
    console.log("book id :" + item.id + " is added to favorites");
  };

  return (
    <div>
      <Card sx={{ width: 200, height: 275 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={instrument.link}
        />
        <CardContent sx={{ height: 150 }}>
          <Typography gutterBottom variant="body2" component="div">
            {instrument.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {instrument.price}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
            marginLeft: "60px",
          }}
        >
          <Button size="small" onClick={() => addToFav(instrument)}>
            fav
          </Button>
          <Button size="small" onClick={() => addToCart(instrument)}>
            Add To Cart
          </Button>
        </Box>
      </Card>
      {/* <div class="card">
        <div class="card-text">
          <h2>{instrument.name}</h2>
          <div class="price">{instrument.price}</div>
          <img src={instrument.link} style={{ width: 100, height: 100 }} />

          <div class="btncart" onClick={() => addToCart(instrument)}>
            Add To Cart
          </div>
          <div class="btnfav" onClick={() => addToFav(instrument)}>
            Fav
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Product;
