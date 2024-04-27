import { Grid, Image, Paper, Stack, Text, Title } from "@mantine/core";
import classes from "../styles/ArtistsGrid.module.css";
import { useNavigate } from "react-router-dom";
import womanPlaceholder from "../assets/images/woman_placeholder.jpg";
import manPlaceholder from "../assets/images/man_placeholder.jpg";

const ArtistsGrid = ({ list }) => {
  const navigate = useNavigate();
  return (
    <Grid
      overflow="hidden"
      justify="center"
      gutter={{ base: 10, xs: "sm", md: "md", xl: "xl" }}
      className={classes.gridContainer}
    >
      {list.map((currentUser) => {
        return (
          <Grid.Col
            key={currentUser.id}
            span={{ base: 12, sm: 6, md: 4, lg: 3 }}
          >
            <Paper
              style={{
                backgroundColor: "light-dark(#fff8e5,#515151)",
              }}
              shadow="md"
              radius="xl"
              p={{ base: "sm", sm: "md", md: "md", lg: "lg" }}
              h={{ base: 300, md: 400 }}
              className={classes.card}
            >
              <div className={classes.cardImageContainer}>
                <Image
                  radius="6%"
                  src={
                    currentUser.photo
                      ? currentUser.photo
                      : currentUser.gender === "female"
                      ? womanPlaceholder
                      : manPlaceholder
                  }
                  onClick={() => navigate(`/users/${currentUser.id}`)}
                  className={classes.cardImage}
                />
              </div>
              <Stack justify="flex-start" align="center">
                <Title order={5} mt="xs">
                  {currentUser.name}
                </Title>
                <Text size="sm">{currentUser.nationality}</Text>
              </Stack>
            </Paper>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default ArtistsGrid;
