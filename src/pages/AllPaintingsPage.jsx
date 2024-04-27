import { useState, useEffect, useContext } from "react";
//import Search from "../components/Search";
import ArtsGrid from "../components/ArtsGrid";
import { UserContext } from "../context/user.context";
import { BreadcrumbContext } from "../context/breadcrumb.context";
import { Container, TextInput, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedState } from "@mantine/hooks";
import classes from "../styles/AllPaintingsPage.module.css";

const AllPaintingsPage = () => {
  const [artworks, setArtworks] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const { fetchUserDetails } = useContext(UserContext);
  const { setItemList } = useContext(BreadcrumbContext);
  const [searchTerm, setSearchTerm] = useDebouncedState("", 10);

  // Fetch all art works from DB
  const fetchAllArtworks = async () => {
    let apiEndPoint = `${import.meta.env.VITE_API_URL}/arts`;
    if (searchTerm) {
      apiEndPoint += `?q=${searchTerm}`;
    }
    try {
      const response = await fetch(apiEndPoint);
      if (response.ok) {
        const responseData = await response.json();
        setArtworks(responseData);
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error("Error while fetching art works,", JSON.stringify(error));
    }
  };

  // Update inCart count of Art
  const updateArtDetail = (artId, inCartCount) => {
    setArtworks(
      artworks.map((currentArt) => {
        if (currentArt.id === artId) {
          currentArt.inCart = inCartCount;
        }
        return currentArt;
      })
    );
  };

  useEffect(() => {
    fetchAllArtworks();
    fetchUserDetails(userId);
    setItemList([{ title: "All Painting" }]);
  }, []);

  useEffect(() => {
    fetchAllArtworks();
  }, [searchTerm]);

  return (
    <>
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
        <ArtsGrid
          list={artworks}
          page={"all-art"}
          updateArtistDetail={updateArtDetail}
        ></ArtsGrid>
      </div>
    </>
  );
};

export default AllPaintingsPage;
