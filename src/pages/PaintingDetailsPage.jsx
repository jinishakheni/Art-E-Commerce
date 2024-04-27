import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "../styles/PaintingDetailsPage.module.css";
import womanPlaceholder from "../assets/images/woman_placeholder.jpg";
import manPlaceholder from "../assets/images/man_placeholder.jpg";
import { UserContext } from "../context/user.context";
import { BreadcrumbContext } from "../context/breadcrumb.context";

import {
  Button,
  Container,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";

const PaintingDetailsPage = () => {
  const [art, setArt] = useState(null);
  const artId = parseInt(useParams().artId);

  const { userDetails, updateUserDetails } = useContext(UserContext);
  const inUserCart = userDetails.cart?.indexOf(artId) < 0 ? false : true;
  const { setItemList } = useContext(BreadcrumbContext);

  // Fetch art details from DB
  const fetchArt = async () => {
    try {
      const responseArt = await fetch(
        `${import.meta.env.VITE_API_URL}/arts/${artId}`
      );
      if (responseArt.ok) {
        const artResponseData = await responseArt.json();
        setItemList([
          { title: "All Painting", url: "/arts" },
          { title: artResponseData.title },
        ]);
        const responseArtist = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${artResponseData.userId}`
        );
        if (responseArtist.ok) {
          const artistResponseData = await responseArtist.json();
          const artDetails = {
            ...artResponseData,
            artist: artistResponseData.name,
            photo: artistResponseData.photo,
            gender: artistResponseData.gender,
          };
          setArt(artDetails);
        } else {
          throw new Error(responseArtist);
        }
      } else {
        throw new Error(responseArt);
      }
    } catch (error) {
      console.error(
        "Error while fetching art or artist data",
        JSON.stringify(error)
      );
    }
  };

  // Update art's inCart count
  const updateArtDetails = async (payload) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/arts/${art.id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        console.log("Art data updated sucessfully");
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error("Error while updating art data: ", error);
    }
  };

  // Form payload - add/remove from cart and update Art's inCart count
  const handleCartButtonClick = () => {
    const { cart } = JSON.parse(JSON.stringify(userDetails));
    let artInCartCount = art.inCart;
    if (inUserCart) {
      cart.splice(cart.indexOf(artId), 1);
      artInCartCount -= 1;
    } else {
      cart.push(artId);
      artInCartCount += 1;
    }
    const updateUserPayload = { cart };
    updateUserDetails(updateUserPayload);
    const updateArtPayload = { inCart: artInCartCount };
    updateArtDetails(updateArtPayload);
  };

  useEffect(() => {
    fetchArt();
  }, []);

  return (
    <div className={classes.background}>
      {art ? (
        <Container className={classes.container}>
          <Flex
            gap={{ base: "30", md: rem(100) }}
            justify={{ base: "space-around", md: "space-between" }}
            align="center"
            direction="row"
            wrap={{ base: "wrap", md: "nowrap" }}
          >
            <div className={classes.left}>
              <Image
                src={art.image}
                className={classes.artImg}
                mt={{ base: rem(10), md: "nowrap" }}
              />
            </div>
            <Stack gap={rem(30)} w={{ base: rem(270), md: rem(600) }}>
              <Stack gap={rem(20)}>
                <div>
                  <Title order={3} tt="uppercase" className={classes.title}>
                    {art.title}
                  </Title>
                  <Text
                    size="md"
                    fw={500}
                    fs="italic"
                    c="light-dark(#e6757d, #ffebb2)"
                  >
                    by {art.artist}
                  </Text>
                </div>
                <Text size="md" c="light-dark(#e6757d, #ffebb2)">
                  {art.description}
                </Text>
              </Stack>
              <Flex
                justify="space-between"
                wrap={{ base: "wrap", md: "nowrap" }}
              >
                <Stack gap={rem(10)}>
                  <Text size="sm" c="light-dark(#e6757d, #ffebb2)">
                    <strong>Category:</strong> {art.category}
                  </Text>
                  <Text size="sm" c="light-dark(#e6757d, #ffebb2)">
                    <strong>Size:</strong> {art.size}cm
                  </Text>
                  <Text size="sm" c="light-dark(#e6757d, #ffebb2)">
                    <strong>Year:</strong> {art.date ? art.date : " - "}
                  </Text>
                </Stack>
                <Link to={"/users/" + art.userId}>
                  <Image
                    src={
                      art.photo
                        ? art.photo
                        : art.gender === "Female"
                        ? womanPlaceholder
                        : manPlaceholder
                    }
                    w={rem(130)}
                    h={rem(130)}
                    classNames={{ root: classes.artistImg }}
                  ></Image>
                </Link>
              </Flex>
              <Container size="xxl" className={classes.details}>
                <Group justify="space-between" h={rem(40)}>
                  <Text size="sm">Get to know the artist:</Text>
                  <Link to={"/users/" + art.userId} className={classes.link}>
                    <Text size="sm">{art.artist}</Text>
                  </Link>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Delivery time:</Text>
                  <Text size="sm">up to 14 days after purchase</Text>
                </Group>
                <div
                  style={{ borderTop: "1px solid #ccc", margin: "20px 0" }}
                />
                <Group justify="space-between">
                  <Text fw={700} fz={25}>
                    {art.price}€
                  </Text>
                  {userDetails.id !== art.userId && (
                    <Button
                      radius="xl"
                      variant="filled"
                      color="light-dark(#e6757d, #8644a2)"
                      onClick={handleCartButtonClick}
                    >
                      {inUserCart ? "Remove from Cart" : "Add to Cart"}
                    </Button>
                  )}
                </Group>
              </Container>
            </Stack>
          </Flex>
        </Container>
      ) : (
        <p> Loading... </p> // Provide a loading state feedback
      )}
    </div>
  );
};

export default PaintingDetailsPage;
