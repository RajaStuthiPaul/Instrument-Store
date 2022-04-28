import store from "./store";
import { useState } from "react";
import { actionTypes } from "./reducers/FavReducer";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";

const CartProduct = ({ item }) => {

  const deleteFromFav = () => {
    const action = {
      type: actionTypes.DELETE_FROM_FAV,
      payload: {
        item: item,
      },
    };
    store.dispatch(action);
    console.log("Deleted a fav");
  };

  const addToCart= (item)=>{
    store.dispatch({type:'ADD_TO_CART',payload:{item:item}})
    console.log("book id :"+item._id+" is added to cart")
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 10px 10px 10px",
          marginLeft: "250px",
          marginRight: "50px",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={10} md={10} lg={10}>
            <Card>
              <CardHeader
                action={
                  <IconButton onClick={()=>{deleteFromFav()}} color="secondary">
                    <DeleteRounded fontSize="large" />
                  </IconButton>
                }
                title={"Your Product ID -  " + item._id}
              />
              <CardContent>
                <Typography variant="h6" align="left">
                  name - {item.name}
                </Typography>
                &nbsp;
                <Typography variant="h6" align="left">
                  price - {item.price}
                </Typography>
                <button onClick={()=>addToCart(item)} >add to cart</button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CartProduct;
