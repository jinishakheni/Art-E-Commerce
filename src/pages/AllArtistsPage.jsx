import { useState, useEffect, useContext } from "react";
import ArtistsGrid from "../components/ArtistsGrid";
import { Container, TextInput, Title, rem } from "@mantine/core";
import { BreadcrumbContext } from "../context/breadcrumb.context";
import { UserContext } from "../context/user.context";
import classes from "../styles/AllArtistsPage.module.css";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedState } from "@mantine/hooks";

const AllArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const { fetchUserDetails } = useContext(UserContext);
  const { setItemList } = useContext(BreadcrumbContext);
  const [searchTerm, setSearchTerm] = useDebouncedState("", 10);

  // Fetch all artist details from DB
  const fetchAllArtists = async () => {
    let apiEndPoint = `${import.meta.env.VITE_API_URL}/users?role=artist`;
    if (searchTerm) {
      apiEndPoint += `&q=${searchTerm}`;
    }
    try {
      const response = await fetch(apiEndPoint);
      if (response.ok) {
        const responseData = await response.json();
        setArtists(responseData);
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error("Error while fetching artists,", JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchAllArtists();
    fetchUserDetails(userId);
    setItemList([{ title: "All Artists" }]);
  }, []);

  useEffect(() => {
    fetchAllArtists();
  }, [searchTerm]);

  return (
    <div className={classes.background}>
      <Title ta="center" className={classes.title}>
        Meet Our Artists{" "}
      </Title>
      <Container h={rem(50)} mt={rem(40)} mb={rem(40)}>
        <TextInput
          styles={{
            input: {
              backgroundColor: "white", // Set background color to white
            },
          }}
          variant="filled"
          radius="xl"
          placeholder="Search..."
          value={searchTerm}
          leftSection={
            <IconSearch style={{ width: rem(16), height: rem(16) }} />
          }
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />
      </Container>
      <div className={classes.gridCtn}>
        <ArtistsGrid list={artists}></ArtistsGrid>
      </div>
    </div>
  );
};

export default AllArtistsPage;
