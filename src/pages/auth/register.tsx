import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Anchor, Box, Button, Group, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { AuthErrorCodes } from "firebase/auth";
import { alert } from "utils";
import { styles } from "utils/constants";
import * as yup from "yup";

import { Service } from "modules/auth";
import { useAuth } from "modules/auth/context";
import { IForm } from "modules/auth/types";

import { GoogleButton, Logo } from "components";

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
		<>
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "98vh" }}>
				<form onSubmit={form.onSubmit(onSubmit)}>
					<Paper
						shadow="md"
						p={30}
						radius="md"
						sx={{
							width: "100%",
							maxWidth: "400px",
							background: "#131720",
							height: "550px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "start",
							alignItems: "center",
							gap: "25px",
							borderRadius: "15px",
							border: "1px solid #151f30 ",
						}}
					>
						<Logo />
						<Box sx={{ marginTop: "15px" }} className="input-box">
							<TextInput
								className="input"
								autoFocus
								placeholder="User Name"
								required
								w={318}
								h={18}
								radius={15}
								styles={styles}
								{...form.getInputProps("name")}
							/>
						</Box>
						<Box className="input-box">
							<TextInput
								className="input"
								autoFocus
								placeholder="Email"
								required
								w={318}
								h={18}
								radius={15}
								styles={styles}
								{...form.getInputProps("email")}
							/>
						</Box>
						<Box className="input-box">
							<PasswordInput
								className="input"
								label=""
								required
								placeholder="Password"
								w={318}
								h={18}
								radius={15}
								color="red"
								styles={styles}
								{...form.getInputProps("password")}
							/>
						</Box>
						<Button
							loading={loading}
							type="submit"
							fullWidth
							sx={{ marginTop: "20px", marginBottom: "-50px" }}
							w={318}
							h={50}
							radius={15}
							bg="#2f80e"
						>
							SIGN UP
						</Button>
						<Text color="white" sx={{ marginTop: "40px", marginBottom: "-40px" }} size="sm" align="center">
							Have an account?
							<Anchor to="/auth/login" size="sm" sx={{ marginLeft: "5px" }} component={Link}>
								Sign in
							</Anchor>
						</Text>
						{isAuthenticated && !isVerified ? (
							<Box sx={{ marginTop: "45px", display: "flex", alignItems: "center", justifyContent: "center" }}>
								<Button onClick={onSend} loading={loading}>
									Send Code
								</Button>
							</Box>
						) : (
							<Group grow sx={{ marginLeft: "5px", marginTop: "45px", width: "80%" }}>
								<GoogleButton radius="xl" onClick={Service.signInWithGoogle}>
									Google
								</GoogleButton>
							</Group>
						)}
					</Paper>
				</form>
			</div>

			{/* <Container size={420} my={40}>
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
							<TextInput
								disabled={isAuthenticated && !isVerified}
								label="Email"
								placeholder="Your email address"
								radius="md"
								{...form.getInputProps("email")}
							/>
							<PasswordInput
								disabled={isAuthenticated && !isVerified}
								label="Password"
								placeholder="Your password"
								radius="md"
								{...form.getInputProps("password")}
							/>
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
			</Container> */}
		</>
	);
};

export default Register;
