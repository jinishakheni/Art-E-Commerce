import { Button, Grid, Group, Image, Paper, Text, Title } from "@mantine/core";
import classes from "../styles/ArtsGrid.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { useContext } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const ArtsGrid = ({
  list,
  page,
  confirmDelete,
  updateArtistDetail,
  openUpdateArtModal,
}) => {
  const navigate = useNavigate();
  const { userDetails, updateUserDetails } = useContext(UserContext);

  const updateArtDetails = async (artId, payload) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/arts/${artId}`,
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
      console.log("Error while updating art data: ", error);
    }
  };

  const handleCartButtonClick = (artId, inCartCount, isInCart) => {
    const { cart } = JSON.parse(JSON.stringify(userDetails));
    if (isInCart) {
      cart.splice(cart.indexOf(artId), 1);
      inCartCount -= 1;
    } else {
      cart.push(artId);
      inCartCount += 1;
    }
    const updateUserPayload = { cart };
    updateUserDetails(updateUserPayload);
    const updateArtPayload = { inCart: inCartCount };
    updateArtDetails(artId, updateArtPayload);
    updateArtistDetail(artId, updateArtPayload.inCart);
  };

  return (
    <Grid
      overflow="hidden"
      justify="center"
      gutter={{ base: 10, xs: "md", md: "xl", xl: 30 }}
      className={classes.gridContainer}
    >
      {list.map((currentItem) => {
        const isInCart =
          userDetails.cart?.indexOf(currentItem.id) < 0 ? false : true;
        const isUserArt = currentItem.userId === userDetails.id;
        return (
          <Grid.Col
            key={currentItem.id}
            span={{ base: 12, sm: 6, md: 4, lg: 3 }}
          >
            <Paper
              p={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
              h={{ base: 450, md: 400 }}
              className={classes.card}
            >
              <div className={classes.cardImageContainer}>
                <Image
                  radius="xs"
                  w="auto"
                  src={currentItem.image}
                  fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                  onClick={() => navigate(`/arts/${currentItem.id}`)}
                  className={classes.cardImage}
                />
              </div>
              <Group justify="space-between">
                <Title order={5} mt="xs">
                  {currentItem.title}
                </Title>
              </Group>
              <Group justify="space-between">
                <Group
                  justify={{ base: "center", md: "flex-start" }}
                  gap={2}
                  align="center"
                >
                  <Text size="sm">{currentItem.category}</Text> |
                  <Text size="sm">{currentItem.size} cm</Text>
                </Group>
                {page === "artist" && isUserArt && (
                  <div>
                    <Button
                      w={30}
                      p={0}
                      variant="subtle"
                      color="light-dark(black, white)"
                      onClick={() => openUpdateArtModal(currentItem)}
                    >
                      <IconPencil />
                    </Button>
                    <Button
                      w={30}
                      p={0}
                      variant="subtle"
                      color="light-dark(black, white)"
                      onClick={() =>
                        confirmDelete(currentItem.id, currentItem.inCart)
                      }
                    >
                      <IconTrash />
                    </Button>
                  </div>
                )}
              </Group>
              <Group justify="space-between" align="center">
                <Text>{currentItem.price}€</Text>
                {!isUserArt && (
                  <Button
                    variant="filled"
                    radius="xl"
                    color="light-dark(#e6757d, #8644a2)"
                    size="xs"
                    px="xs"
                    fz="xs"
                    className={classes.btn}
                    onClick={() => {
                      handleCartButtonClick(
                        currentItem.id,
                        currentItem.inCart,
                        isInCart
                      );
                    }}
                  >
                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                  </Button>
                )}
              </Group>
            </Paper>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default ArtsGrid;
