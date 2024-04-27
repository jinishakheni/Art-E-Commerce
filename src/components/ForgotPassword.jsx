import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "../styles/ForgotPassword.module.css";
import { Link } from "react-router-dom";

export function ForgotPassword() {
  return (
    <div className={classes.background}>
      <Container size={460} my={30}>
        <Title
          className={classes.title}
          ta="center"
          c="light-dark(#e6757d, #8644a2)"
        >
          Forgot your password?
        </Title>
        <br />
        <Text c="light-dark(#e6757d, #8644a2)" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>

        <Paper shadow="md" p={30} mt={30} radius="xl">
          <TextInput
            variant="filled"
            radius="xl"
            label="Your email"
            placeholder="your@email.com"
            required
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Center inline className={classes.controls}>
              <IconArrowLeft
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
              <Link to={"/"}>
                <Box ml={5} size="sm">
                  <Text size="sm">Back to the login page</Text>
                </Box>
              </Link>
            </Center>
            <Button
              radius="xl"
              color="light-dark(#e6757d, #8644a2)"
              className={classes.control}
            >
              Reset password
            </Button>
          </Group>
        </Paper>
      </Container>
    </div>
  );
}

export default ForgotPassword;
