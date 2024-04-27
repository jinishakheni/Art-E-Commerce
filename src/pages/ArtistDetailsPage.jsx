import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BreadcrumbContext } from "../context/breadcrumb.context";
import {
  Button,
  Container,
  Group,
  Modal,
  ScrollArea,
  Title,
  rem,
} from "@mantine/core";

import classes from "../styles/ArtistDetailsPage.module.css";
import ArtsGrid from "../components/ArtsGrid";
import { useDisclosure } from "@mantine/hooks";
import AddEditArtModal from "../components/AddEditArtModal";
import EditArtistModal from "../components/EditArtistModal";
import DeleteArtModal from "../components/DeleteArtModal";
import ArtistPersonalInfo from "../components/ArtistPersonalInfo";

const ArtistDetailsPage = () => {
  const artistId = parseInt(useParams().userId);
  const { setItemList } = useContext(BreadcrumbContext);
  const [artist, setArtist] = useState(null);

  // Handle artist's personal info update modal
  let [opened, { open, close }] = useDisclosure(false);
  const editPersonalInfoModal = { opened, open, close };

  // Handle delete art modal
  [opened, { open, close }] = useDisclosure(false);
  const deleteArtModal = { opened, open, close };
  const [deleteArtId, setDeleteArtId] = useState(null);
  const [canDeleteArt, setCanDeleteArt] = useState(false);

  // Handle artist's personal info update modal
  [opened, { open, close }] = useDisclosure(false);
  const addEditArtModal = { opened, open, close };

  const [prefillArtDetail, setPrefillArtDetail] = useState({
    title: "",
    description: "",
    category: "",
    size: "",
    date: "",
    image: "",
    userId: artistId,
    price: 0,
    inCart: 0,
    nationality: "",
  });
  const [isNewArt, setIsNewArt] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const isArtistLoggedIn = userId === artistId;

  // Fetch Artist information
  const fetchArtist = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${artistId}?_embed=arts`
      );
      if (response.ok) {
        const responseData = await response.json();
        setArtist(responseData);
        setItemList([
          { title: "All Artists", url: "/artists" },
          { title: responseData.name },
        ]);
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error(
        "Error while fetching artist details:",
        JSON.stringify(error)
      );
    }
  };

  // Open modal for update art and Prefill art details
  const openUpdateArtModal = (artDetail) => {
    setPrefillArtDetail(artDetail);
    setIsNewArt(false);
    addEditArtModal.open();
  };

  // Close add/update art modal and set its prefill value to empty
  const closeAddEditArtModal = () => {
    setPrefillArtDetail({
      title: "",
      description: "",
      category: "",
      size: "",
      date: "",
      image: "",
      userId: artistId,
      price: 0,
      inCart: 0,
    });
    addEditArtModal.close();
  };

  // Update inCart count of Art in state Artist
  const updateArtistDetail = (artId, inCartCount) => {
    setArtist({
      ...artist,
      arts: artist.arts.map((currentArt) => {
        if (currentArt.id === artId) {
          currentArt.inCart = inCartCount;
        }
        return currentArt;
      }),
    });
  };

  // Update Artist's personal info in DB
  const updateArtistPersonalInfo = async (payload) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${artist.id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setArtist({ ...artist, ...responseData });
        editPersonalInfoModal.close();
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error(
        "Error occured while updating artist info:",
        JSON.stringify(error)
      );
    }
  };

  // Add or update art in DB
  const addUpdateArt = async (payload) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL.concat(
          isNewArt ? `/arts` : `/arts/${prefillArtDetail.id}`
        ),
        {
          method: isNewArt ? "POST" : "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log("Data saved successfully");
        if (isNewArt) {
          setArtist({ ...artist, arts: [...artist.arts, responseData] });
        } else {
          setArtist({
            ...artist,
            arts: artist.arts.map((currentArt) => {
              if (currentArt.id === responseData.id) {
                return { ...currentArt, ...responseData };
              }
              return currentArt;
            }),
          });
        }
        closeAddEditArtModal();
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error("Error while add/update art:", error);
    }
  };

  // Set flag CanDeleteArt and open delete art modal
  const confirmDelete = (artId, inCartCount) => {
    if (inCartCount === 0) setCanDeleteArt(true);
    else setCanDeleteArt(false);
    setDeleteArtId(artId);
    deleteArtModal.open();
  };

  // Delete art in DB
  const deleteArt = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/arts/${deleteArtId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        console.log("Art deleted sucessfully");
        setArtist({
          ...artist,
          arts: artist.arts.filter((item) => item.id != deleteArtId),
        });
        deleteArtModal.close();
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error("Error while deleting art: ", error);
    }
  };

  useEffect(() => {
    fetchArtist();
  }, []);

  return (
    <div className={classes.background}>
      {artist ? (
        <>
          {/* Display artist personal information */}
          <Container className={classes.artistContainer}>
            <ArtistPersonalInfo
              artistDetails={artist}
              isArtistLoggedIn={isArtistLoggedIn}
              editPersonalInfoModal={editPersonalInfoModal.open}
            />
          </Container>

          {/* Artist's Arts display */}
          <>
            <Title
              order={2}
              ta="center"
              className={classes.title}
              mt={rem(50)}
              mb={rem(50)}
            >
              All Artworks by {artist.name}
            </Title>
            {artist.arts?.length ? (
              <ArtsGrid
                list={artist.arts}
                page={"artist"}
                confirmDelete={confirmDelete}
                updateArtistDetail={updateArtistDetail}
                openUpdateArtModal={openUpdateArtModal}
              ></ArtsGrid>
            ) : (
              <Title
                className={classes.title}
                order={5}
                ta="center"
                h={rem(50)}
                mt="lg"
                fw="500"
              >
                No Art
              </Title>
            )}

            {isArtistLoggedIn && (
              <Group justify="center" m="lg">
                <Button
                  size="lg"
                  variant="filled"
                  radius="xl"
                  color="light-dark(#e6757d, #8644a2)"
                  onClick={() => {
                    setIsNewArt(true);
                    addEditArtModal.open();
                  }}
                >
                  <span className={classes.textButton}>Add Art</span>
                </Button>
              </Group>
            )}
          </>
        </>
      ) : (
        <p> </p> // Provide a loading state feedback
      )}

      {/* Update artist modal */}
      <Modal
        padding="lg"
        radius="xl"
        opened={editPersonalInfoModal.opened}
        onClose={editPersonalInfoModal.close}
        size="lg"
        title="Personal Information"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <EditArtistModal
          artistDetails={artist}
          updateArtistPersonalInfo={updateArtistPersonalInfo}
        />
      </Modal>

      {/* Delete art modal */}
      <Modal
        padding="xl"
        radius="xl"
        size="lg"
        opened={deleteArtModal.opened}
        onClose={deleteArtModal.close}
        title="Confirm Deletion"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <DeleteArtModal
          canDeleteArt={canDeleteArt}
          deleteArt={deleteArt}
          deleteArtModal={deleteArtModal.close}
        />
      </Modal>

      {/* Update art modal */}
      <Modal
        padding="lg"
        size="lg"
        radius="xl"
        opened={addEditArtModal.opened}
        onClose={() => {
          closeAddEditArtModal();
        }}
        title="Art Details"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <AddEditArtModal
          isNewArt={isNewArt}
          artDetail={prefillArtDetail}
          addUpdateArt={addUpdateArt}
        />
      </Modal>
    </div>
  );
};

export default ArtistDetailsPage;
