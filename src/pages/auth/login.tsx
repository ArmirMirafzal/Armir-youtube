import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Anchor, Box, Button, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
// import { GoogleButton } from "components";
import { styles } from "utils/constants";
import * as yup from "yup";

import { Service } from "modules/auth";
// import { signInWithGoogle } from "modules/auth/service";
import { IForm } from "modules/auth/types";

import { Logo } from "components";

const schema = yup.object({
	email: yup.string().email().label("Email").required(),
	password: yup.string().min(6).label("Password").required(),
});

const Login = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState(false);
	const form = useForm<IForm.Login>({
		initialValues: { email: "", password: "" },
		validate: yupResolver(schema),
	});

	const onSubmit = async (values: IForm.Login) => {
		try {
			setLoading(true);
			await Service.login(values);
			navigate("/");
		} catch (err: any) {
			notifications.show({ message: err?.message, color: "red" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
				<form onSubmit={form.onSubmit(onSubmit)}>
					<Paper
						shadow="md"
						p={30}
						radius="md"
						sx={{
							width: "100%",
							maxWidth: "400px",
							background: "#131720",
							height: "500px",
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
								placeholder="Email"
								required
								w={318}
								h={18}
								radius={15}
								styles={styles}
								{...form.getInputProps("email")}
							/>
						</Box>
						<Box sx={{ marginTop: "15px" }} className="input-box">
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
						<Button loading={loading} type="submit" fullWidth mt="xl" w={318} h={50} radius={15} bg="#2f80e">
							SIGN IN
						</Button>
						<Text color="white" size="sm" align="center" mt={5}>
							Don't have an account?
							<Anchor to="/auth/register" sx={{ marginLeft: "5px" }} size="sm" component={Link}>
								Sign Up
							</Anchor>
						</Text>
						<Anchor to="/forgotPassword" component={Link}>
							Forgot password?
						</Anchor>
					</Paper>
				</form>
			</div>

			{/* <Container size={420} my={40}>
				<Paper radius="md" p="xl" withBorder>
					<Text size="lg" weight={500} sx={{ textAlign: "center" }}>
						Welcome to Armir-Tube
					</Text>

					<Group grow mb="md" mt="md">
						<GoogleButton radius="xl" onClick={signInWithGoogle} children="Google" />
					</Group>

					<Divider label="Or continue with email" labelPosition="center" my="lg" />
					<form onSubmit={form.onSubmit(onSubmit)}>
						<Stack>
							<TextInput label="Email" placeholder="Your email address" radius="md" {...form.getInputProps("email")} />

							<PasswordInput label="Password" placeholder="Your password" radius="md" {...form.getInputProps("password")} />
						</Stack>

						<Anchor
							sx={{ marginTop: "10px" }}
							component="button"
							type="button"
							color="dimmed"
							onClick={() => navigate("/forgotPassword")}
							size="sm"
							children="Forgot Password"
						/>

						<Group position="apart" mt="xl">
							<Anchor component="button" type="button" color="dimmed" onClick={() => navigate("/auth/register")} size="sm">
								Don't have an account? Register
							</Anchor>
							<Button loading={loading} type="submit" radius="xl" children="Login" />
						</Group>
					</form>
				</Paper>
			</Container> */}
		</>
	);
};

export default Login;
