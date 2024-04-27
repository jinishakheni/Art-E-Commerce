import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartItem from "./CartItem";
import classes from "../styles/Cart.module.css";
import { Button, Text, Title } from "@mantine/core";
import { UserContext } from "../context/user.context";

const Cart = ({ closeDrawer }) => {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const [cartDetails, setCartDetails] = useState([]);
  const [fetching, setFetching] = useState(true);
  const { updateUserDetails } = useContext(UserContext);

  const navigate = useNavigate();

  const getCart = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${userId}`)
      .then((response) => {
        const cartItems = response.data.cart;
        if (cartItems.length > 0) {
          return Promise.all(
            cartItems.map((artId) =>
              axios
                .get(`${import.meta.env.VITE_API_URL}/arts/${artId}`)
                .then((artResponse) => {
                  return {
                    artId,
                    ...artResponse.data,
                  };
                })
            )
          );
        } else {
          return []; // Return an empty array to handle no cart items case
        }
      })
      .then((cartArtDetails) => {
        setCartDetails(cartArtDetails);
        setFetching(false);
      })
      .catch((error) => {
        console.error("Failed to fetch cart details:", error);
        setFetching(false);
      });
  };

  useEffect(() => {
    getCart();
  }, [userId]); // React to changes in userId if it can change during component's lifecycle

  function handleDelete(artId) {
    const filteredCartDetails = cartDetails.filter(
      (currentArt) => artId !== currentArt.artId
    );
    setCartDetails(filteredCartDetails);

    const filteredCart = [];
    filteredCartDetails.map((currentArt) => filteredCart.push(currentArt.id));

    const payload = {
      cart: filteredCart,
    };
    updateUserDetails(payload);
  }

  return (
    <div className={classes.cartList}>
      <Title order={1} mb="lg" className={classes.title}>
        Your Cart
      </Title>

      <Text c="light-dark(#e6757d, #8644a2)" onClick={closeDrawer} order={3}>
        Continue shopping
      </Text>

      {fetching ? (
        <Title>Loading cart...</Title>
      ) : (
        cartDetails.map((art, index) => (
          <CartItem key={index} art={art} handleDelete={handleDelete} />
        ))
      )}
      <div className={classes.totalCtn}>
        <Button
          color="light-dark(#e6757d, #8644a2)"
          variant="filled"
          size="md"
          radius="xl"
          onClick={() => {
            closeDrawer();
            navigate(`/checkout/${userId}`);
          }}
        >
          Checkout
        </Button>
        <div className={classes.textCtn}>
          <Text>
            Total: €{" "}
            <Text component="span" size="xl" fw={800}>
              {cartDetails.reduce((acumulator, currentArt) => {
                return (acumulator += currentArt.price);
              }, 0)}
            </Text>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Cart;
