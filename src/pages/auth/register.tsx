import React from "react";
import { useNavigate } from "react-router-dom";
import { Anchor, Box, Button, Container, Divider, Group, Paper, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { AuthErrorCodes } from "firebase/auth";
import { alert } from "utils";
import * as yup from "yup";

import { Service } from "modules/auth";
import { useAuth } from "modules/auth/context";
import { IForm } from "modules/auth/types";

import { GoogleButton } from "components";

const schema = yup.object({
  name: yup.string().min(5).label("Name").required(),
  email: yup.string().email().label("Email").required(),
  password: yup.string().min(6).label("Password").required(),
});

const Register = () => {
  const { methods, user, isAuthenticated } = useAuth();
  const isVerified = user?.isVerified || false;
  const [loading, setLoading] = React.useState(false);
  const [verifyLoading, setVerifyLoading] = React.useState(false);
  const navigate = useNavigate();
  const form = useForm<IForm.Register>({
    initialValues: { name: "", email: "", password: "" },
    validate: yupResolver(schema),
  });

  const onSubmit = async ({ name, password, email }: IForm.Register) => {
    try {
      setLoading(true);
      const { user } = await Service.register({ email, password });

      await Service.updateProfile(user, { name });

      methods.update({ name, isVerified: false, email });

      alert.info('click the "send code" button ');
    } catch (err: any) {
      if (err?.code === AuthErrorCodes.EMAIL_EXISTS) {
        notifications.show({ message: `this email ${email} already exist`, color: "red" });
      } else notifications.show({ message: err?.message, color: "red" });
    } finally {
      setLoading(false);
    }
  };

  const onSend = async () => {
    try {
      setVerifyLoading(true);

      await Service.sendVerification();

      alert.success("Sent verification link");

      setVerifyLoading(false);
    } catch (err: any) {
      alert.error(`${err?.message}`);
      setVerifyLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500} sx={{ textAlign: "center" }}>
          Welcome to Armir-Tube
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl" onClick={Service.signInWithGoogle}>
            Google
          </GoogleButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <TextInput disabled={isAuthenticated && !isVerified} label="Name" placeholder="Your name" radius="md" {...form.getInputProps("name")} />
            <TextInput disabled={isAuthenticated && !isVerified} label="Email" placeholder="Your email address" radius="md" {...form.getInputProps("email")} />
            <PasswordInput disabled={isAuthenticated && !isVerified} label="Password" placeholder="Your password" radius="md" {...form.getInputProps("password")} />
          </Stack>
          <Group position="apart" mt="xl">
            <Anchor component="button" type="button" color="dimmed" onClick={() => navigate("/auth/login")} size="xs">
              Already have an account? Login
            </Anchor>
            <Button disabled={isAuthenticated && !isVerified} loading={loading} type="submit" radius="xl">
              Register
            </Button>
          </Group>
        </form>

        {isAuthenticated && !isVerified ? (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button onClick={onSend} loading={loading}>
              Send Code
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Paper>
    </Container>
  );
};

export default Register;
