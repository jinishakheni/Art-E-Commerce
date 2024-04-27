import {
  Button,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import classes from "../styles/ArtistPersonalInfo.module.css";
import womanPlaceholder from "../assets/images/woman_placeholder.jpg";
import manPlaceholder from "../assets/images/man_placeholder.jpg";
import { IconEdit } from "@tabler/icons-react";

const ArtistPersonalInfo = ({
  artistDetails,
  isArtistLoggedIn,
  editPersonalInfoModal,
}) => {
  return (
    <div className="container">
      <Flex
        gap={{ base: "30", md: rem(100) }}
        justify={{ base: "space-around", md: "space-between" }}
        align="center"
        direction={{ base: "column", md: "row" }}
        wrap={{ base: "nowrap", md: "nowrap" }}
      >
        <div className={classes.left}>
          <Image
            src={
              artistDetails.photo
                ? artistDetails.photo
                : artistDetails.gender === "Female"
                ? womanPlaceholder
                : manPlaceholder
            }
            className={classes.userImg}
            mt={{ base: rem(10), md: "nowrap" }}
          />
        </div>
        <Stack gap={rem(30)} w={{ base: rem(270), md: rem(600) }}>
          <Group justify="space-between">
            <Title order={2} tt="uppercase">
              {artistDetails.name}
            </Title>
            {isArtistLoggedIn && (
              <Button
                w={50}
                p={3}
                variant="subtle"
                color="light-dark(black, orange)"
                onClick={editPersonalInfoModal}
              >
                <IconEdit style={{ color: "light-dark(#e6757d, #ffebb2)" }} />
              </Button>
            )}
          </Group>

          <Text size="lg">{artistDetails.description}</Text>
          <Flex justify="space-between" wrap={{ base: "wrap", md: "nowrap" }}>
            <Stack gap={rem(10)}>
              <Text size="sm">
                <strong>Nationality:</strong> {artistDetails.nationality}
              </Text>
              <Text size="sm">
                <strong>Gender:</strong> {artistDetails.gender}
              </Text>
            </Stack>
            <Stack gap={rem(10)}>
              <Text size="sm">
                <strong>Email:</strong> {artistDetails.email}
              </Text>
            </Stack>
          </Flex>
        </Stack>
      </Flex>
    </div>
  );
};

export default ArtistPersonalInfo;
