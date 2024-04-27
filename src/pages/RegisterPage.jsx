import {
  TextInput,
  PasswordInput,
  Radio,
  CheckIcon,
  RadioGroup,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "../styles/RegisterPage.module.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    if (!role) validationErrors.role = "Please select your role";

    setErrors(validationErrors);

    // Check if there are any errors
    if (Object.keys(validationErrors).length > 0) return;

    // Send registration data to the server
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          cart: [],
        }),
      });
      if (response.ok) {
        navigate("/", { state: { email } }); // Navigate to login with email in state
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({
        ...errors,
        email: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className={classes.background}>
      <Container size={420} my={40}>
        <Title
          className={classes.title}
          ta="center"
          textWrap="wrap"
          c="light-dark(#ffebb2, #8644a2)"
        >
          Create <br />
          Your Account
        </Title>
        <Paper shadow="md" p={30} mt={30} radius="xl">
          <TextInput
            styles={{
              input: {
                backgroundColor: "light-dark(white, #444a)", // Set background color to white
              },
            }}
            variant="filled"
            radius="xl"
            label="Name"
            placeholder="Your name"
            required
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            error={errors.name}
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
          <RadioGroup
            label="Role"
            required
            value={role}
            onChange={setRole}
            error={errors.role}
          >
            <Radio
              icon={CheckIcon}
              color="light-dark(#e6757d, #8644a2)"
              value="buyer"
              label="Buyer Only"
              mb={rem(5)}
            />
            <Radio
              icon={CheckIcon}
              color="light-dark(#e6757d, #8644a2)"
              value="artist"
              label="Artist"
            />
          </RadioGroup>
          <Button
            variant="filled"
            radius="xl"
            fullWidth
            color="light-dark(#e6757d, #8644a2)"
            mt="xl"
            onClick={handleSubmit}
          >
            <span className={classes.buttonText}>Register</span>
          </Button>
          <Text align="center" size="sm" mt="md">
            Already have an account?{" "}
            <Anchor component={Link} to="/" size="sm">
              Sign in
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </div>
  );
};
export default RegisterPage;
