import {
  Button,
  Image,
  PasswordInput,
  Select,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useState } from "react";
import no_photo from "../assets/images/no_photo.png";
import { SelectCreatable } from "./SelectCreatable";

const EditArtistModal = ({ artistDetails, updateArtistPersonalInfo }) => {
  const [name, setName] = useState(artistDetails.name);
  const [description, setDescription] = useState(
    artistDetails.description || ""
  );
  const [email, setEmail] = useState(artistDetails.email);
  const [password, setPassword] = useState(artistDetails.password);
  const [gender, setGender] = useState(artistDetails.gender);
  const [nationality, setNationality] = useState(artistDetails.nationality);
  const [photo, setPhoto] = useState(
    artistDetails.photo ? artistDetails.photo : ""
  );

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate link format
  const isValidLink = (link) => {
    const linkRegex = /http[s]?:\/\/[^\s/$.?#].[^\s]*/;
    return linkRegex.test(link);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    let validationErrors = {};
    if (!name) validationErrors.name = "Name is required";
    if (!email) validationErrors.email = "Email is required";
    else if (!isValidEmail(email))
      validationErrors.email = "Invalid email format";
    if (!password) validationErrors.password = "Password is required";
    if (photo && !isValidLink(photo)) validationErrors.photo = "Invalid URL";
    setErrors(validationErrors);

    // Check if there are any errors
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      name,
      description,
      email,
      password,
      gender,
      photo,
      nationality,
    };
    updateArtistPersonalInfo(payload);
  };
  return (
    <Stack gap={15}>
      <TextInput
        variant="filled"
        radius="xl"
        label="Name"
        placeholder="Your name"
        required
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        error={errors.name}
      />
      <Textarea
        variant="filled"
        radius="xl"
        label="Description"
        placeholder="Write about your self..."
        value={description}
        rows={4}
        onChange={(event) => setDescription(event.currentTarget.value)}
      />
      <TextInput
        variant="filled"
        radius="xl"
        label="Email"
        placeholder="example@domain.com"
        required
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        error={errors.email}
      />
      <PasswordInput
        variant="filled"
        radius="xl"
        label="Password"
        placeholder="Your password"
        required
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        error={errors.password}
      />
      <SelectCreatable
        nationality={nationality ?? ""}
        setNationality={setNationality}
      />
      <Select
        variant="filled"
        radius="xl"
        label="Gender"
        placeholder="Gender"
        data={["Female", "Male"]}
        value={gender}
        onChange={setGender}
      />
      <TextInput
        variant="filled"
        radius="xl"
        label="Photo"
        placeholder="Your Image URL"
        value={photo}
        onChange={(event) => setPhoto(event.currentTarget.value)}
        error={errors.photo}
      />

      <Image radius="xl" src={photo ? photo : no_photo} h="25rem" mt="xl" />

      <Button
        radius="xl"
        fullWidth
        mt="xl"
        variant="filled"
        color="light-dark(#e6757d, #8644a2)"
        onClick={handleSubmit}
      >
        Update Information
      </Button>
    </Stack>
  );
};

export default EditArtistModal;
