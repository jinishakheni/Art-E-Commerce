import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CartItem from "../components/CartItem";
import classes from "../styles/CheckoutPage.module.css";
import { Button, Timeline, Text, Title } from "@mantine/core";
import { UserContext } from "../context/user.context";
import { BreadcrumbContext } from "../context/breadcrumb.context";

const CheckoutPage = () => {
  const { userId } = useParams();
  const [cartDetails, setCartDetails] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { updateUserDetails } = useContext(UserContext);
  const { setItemList } = useContext(BreadcrumbContext);

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
                .then((artResponse) => ({
                  artId,
                  ...artResponse.data,
                }))
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
    setItemList([{}]);
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
    <div className={classes.root}>
      <div className={classes.cartList}>
        <Title className={classes.title} order={1}>
          Your Order:
        </Title>
        <Text
          c="light-dark(#e6757d, #8644a2)"
          onClick={() => navigate("/arts")}
        >
          Back to shopping
        </Text>
        {fetching ? (
          <p>Loading cart...</p>
        ) : (
          cartDetails.map((art, index) => (
            <CartItem key={index} art={art} handleDelete={handleDelete} />
          ))
        )}
        <div className={classes.totalCtn}>
          <Button
            variant="filled"
            color="light-dark(#e6757d, #8644a2)"
            size="md"
            radius="xl"
          >
            Delivery
          </Button>
          <div className={classes.textCtn}>
            <p>
              Total:{" "}
              <span className={classes.priceText}>
                $
                {cartDetails.reduce((acumulator, currentArt) => {
                  return (acumulator += currentArt.price);
                }, 0)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className={classes.timeline}>
        <Timeline
          color="light-dark(#e6757d, #8644a2)"
          active={1}
          bulletSize={25}
          lineWidth={4}
        >
          <Timeline.Item title="Add to Cart">
            <Text c="dimmed" size="sm">
              Chose the art you want
            </Text>
            <Text size="xs" mt={4}>
              Done!
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Checkout">
            <Text c="dimmed" size="sm">
              Review and confirm
            </Text>
            <Text size="xs" mt={4}>
              In progress...
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Delivery" lineVariant="dashed">
            <Text c="dimmed" size="sm">
              Fill your address
            </Text>
            <Text size="xs" mt={4}>
              Pending{" "}
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Payment">
            <Text c="dimmed" size="sm">
              Introduce credit card{" "}
            </Text>
            <Text size="xs" mt={4}>
              Pending{" "}
            </Text>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
};

export default CheckoutPage;
