import store from "./store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./navb.css"
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { MenuBookRounded } from "@material-ui/icons";
import CartCounter from "./CartCounter";

function NavBar({ user , login }) {
  const logOut = () => {
    store.dispatch({ type: "logOut" });
    console.log("Successfully logged out");
  };
  function MouseOver(event) {
    event.target.style.background ='#1f3a85';
      }
  function MouseOut(event){
    event.target.style.background="";
  }
  
 
    
  const loginComp = !login ? <Link onMouseOver={MouseOver} onMouseOut={MouseOut}
              to="/signin"
              style={{
                fontSize: "1.17em",
                textDecoration: "none",
                color: "white",
                marginLeft:"80px"
              }}>Login</Link> : 
          <div className="dropdown">
            <button className="dropbtn">Account & Lists</button>
            <div className="dropdown-content">
              <a href="/profile">Your Account</a>
              <a href="/orders">Your Orders</a>
              <a href="fav">Your Wishlist</a>
              <a href="/"  onClick={logOut} > LogOut</a>
            </div>
          </div>
              

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "5px 0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "7%",
            }}
          >
            
              <Link
                to="/home"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft:"150%"
                }}
              >
              <img  height={48}  src="./pics/86.jpg" />
              </Link>
           
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "60%",
            }}
          >
           
          </Box>
        <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "15%",
              
              padding: "5px 0px",
            }}
          >
            {loginComp}
          </Box>
           <Box 
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "10%",
              marginRight:"-20px",
               marginLeft:"1%",
            }}
          >
            <Link onMouseOver={MouseOver} onMouseOut={MouseOut}
              to={login? "/fav" : "/signin"}
              style={{
                fontSize: "1.17em",
                textDecoration: "none",
                color: "white",
              }}
            >
              Favourites
            </Link>
          </Box>
            <Box 
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "10%",
              marginRight:"1%",
              marginLeft:"1%"
              
            }}
          >
            <Link onMouseOver={MouseOver} onMouseOut={MouseOut}
              to={login? "/orders" : "/signin"}
              style={{
                fontSize: "1.17em",
                textDecoration: "none",
                color: "white",
                
              }}
            >
              Returns & Orders
            </Link>
          </Box>
           <CartCounter/>
          
         
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    login : state.loginReducer.loginSuccess,
    user: state.loginReducer.user
  };
};


export default connect(mapStateToProps)(NavBar);
