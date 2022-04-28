import axios from "axios";
import store from "./store"
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { ShoppingBasketRounded } from "@material-ui/icons";

function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/users/${user._id}`)
        .then((res) => {
          setOrders(res.data.orders);
          console.log("Your orders retrieved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    console.log(user) 
    fetchData();
  }, [user]);

  const returnBooks = (item) => {
    const order = {
        _id: user._id,
        username: user.username,
        password : user.password,
        firstname:user.firstname,
        lastname:user.lastname,
        orders : user.orders.filter((i)=> i._id != item._id)
    };
    axios
      .patch(`http://localhost:5000/users/${user._id}`, order)
      .then((res) => {
        store.dispatch({type:"loginSuccess",payload:order})
        console.log(item.name+" returned successfully");
        setOrders(orders.filter((i) => i._id !== item._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 30 }}></div>
      <Typography variant="h3">
        <ShoppingBasketRounded fontSize="large" />
        &nbsp; Orders
      </Typography>
      <div style={{ marginTop: 30 }}></div>
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
          {orders.map((order, i) => {
            return (
              <Grid item key={i} xs={10} md={10} lg={10}>
                <Card key={i}>
                  <CardContent>
                    &nbsp;
                    <Typography variant="h6" align="left">
                      Instrument Name - {order.name}
                    </Typography>
                    &nbsp;
                    <Typography variant="h6" align="left">
                     Price - ₹{ order.price }
                    </Typography>
                    &nbsp;
                    <Typography variant="h6" align="left">
                      Count - { order.count}
                    </Typography>
                    &nbsp;
                    <Typography variant="h6" align="left">
                     Total Price - { order.count * (parseInt(order.price.split(",")[0])*1000 + parseInt(order.price.split(",")[1])) } Rupees
                    </Typography>
                    &nbsp;
                    <button onClick={() => returnBooks(order)}>Return </button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(Orders);
