import store from "./store";
import { useState } from "react";
import { actionTypes } from "./reducers/CartReducer";
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
  const [qty, setQty] = useState(item.count);
  const deleteFromCart = () => {
    const action = {
      type: actionTypes.DELETE_FROM_CART,
      payload: {
        item: item,
      },
    };
    store.dispatch(action);
    console.log("deleted a book in cart");
  };
  const changeQuantity = () => {
    const action = {
      type: actionTypes.CHANGE_QUANTITY,
      payload: {
        item: {
          ...item,
          count: parseInt(qty),
        },
      },
    };
    store.dispatch(action);
  };

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
                  <IconButton onClick={deleteFromCart} color="secondary">
                    <DeleteRounded fontSize="large" />
                  </IconButton>
                }
                title={"Your Product ID -  " + item.id}
              />
              <input
                type="number"
                value={qty}
                min="0"
                onChange={(e) => setQty(e.target.value)}
              />
              <button className="btn" onClick={changeQuantity}>
                Change
              </button>
              <h4>{item.count}</h4>
              <CardContent>
                <Typography variant="h6" align="left">
                  name - {item.name}
                </Typography>
                &nbsp;
                <Typography variant="h6" align="left">
                  Instrument price - ₹{item.price}
                </Typography>
                &nbsp;
                <Typography variant="h6" align="left">
                  Total - { item.count * (parseInt(item.price.split(",")[0])*1000 + parseInt(item.price.split(",")[1])) } Rupees
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CartProduct;
