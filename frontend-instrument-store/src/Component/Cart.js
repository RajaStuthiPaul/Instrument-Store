import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "./store";
import CartProduct from "./CartProduct";
import { actionTypes } from "./reducers/CartReducer";
import NavBar from "./NavBar";
import { ShoppingCartRounded } from "@material-ui/icons";
import { Typography, Button } from "@material-ui/core";

function Cart({ cart, user }) {
  const history = useNavigate();

  const placeOrder = () => {
    cart.forEach((item) => {
      let order = {
        _id:user._id,
        username: user.username,
        password : user.password,
        firstname:user.firstname,
        lastname:user.lastname,
        orders : [...user.orders,item]
      };
      axios
        .patch(`http://localhost:5000/users/${user._id}`,order)
        .then((res) => {
          store.dispatch({type:"loginSuccess",payload:order})
          console.log("order placed successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    });
    setTimeout(() => {
      store.dispatch({type: actionTypes.RESET_CART});
      console.log("Cart Reset");
      history("/orders");
    }, 1000);
  };

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 30 }}></div>
      <Typography variant="h3">
        <ShoppingCartRounded fontSize="large" />
        &nbsp; Cart
      </Typography>
      {cart.map((item, id) => {
        return <CartProduct item={item} key={id} />;
      })}
      <div style={{ marginTop: 30 }}></div>
      <Button color="secondary" variant="contained" onClick={placeOrder}>
        Check Out
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(Cart);
