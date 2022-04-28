import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "./store";
import FavProduct from "./FavProduct";
import { actionTypes } from "./reducers/CartReducer";
import NavBar from "./NavBar";
import { ShoppingCartRounded } from "@material-ui/icons";
import { Typography, Button } from "@material-ui/core";

function Fav({ fav }) {

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 30 }}></div>
      <Typography variant="h3">
        <ShoppingCartRounded fontSize="large" />
        &nbsp; Favourites
      </Typography>
      {fav.map((item, id) => {
        return <FavProduct item={item} key={id} />;
      })}
      <div style={{ marginTop: 30 }}></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fav: state.favReducer.fav,
  };
};

export default connect(mapStateToProps)(Fav);
