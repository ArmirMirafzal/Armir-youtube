import React from "react";
import { Link } from "react-router-dom";
// import { Box, Button, Container, Flex, Paper, TextInput, Title } from "@mantine/core";
import { Anchor, Box, Button, Paper, Text, TextInput, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { alert } from "utils";
import { styles } from "utils/constants";
import { object, string } from "yup";

import { Service } from "modules/auth";

import { Logo } from "components";

const schema = object({
	email: string().email().label("Email").required(),
});

const ForgotPassword = () => {
	const [loading, setLoading] = React.useState(false);

	const { getInputProps, onSubmit } = useForm({ initialValues: { email: "" }, validate: yupResolver(schema) });

	const onForgot = async ({ email }: any) => {
		try {
			setLoading(true);

			await Service.sendResetPasswordLink(email);

			alert.success("Sent forgot password link 🎉");
			setLoading(false);
		} catch (err: any) {
			alert.error(err?.message);
			setLoading(false);
		}
	};

	return (
		<>
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
				<form onSubmit={onSubmit(onForgot)}>
					<Paper
						shadow="md"
						p={30}
						radius="md"
						sx={{
							width: "100%",
							maxWidth: "400px",
							background: "#131720",
							height: "370px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "start",
							alignItems: "center",
							gap: "25px",
							borderRadius: "15px",
							border: "1px solid #151f30 ",
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<Logo />
							<Title>Forgot</Title>
						</Box>
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
								{...getInputProps("email")}
							/>
						</Box>
						<Button
							sx={{ marginTop: "20px", padding: "15px", height: "75px", fontSize: "17px" }}
							loading={loading}
							type="submit"
							fullWidth
							mt="xl"
							w={318}
							radius={15}
							bg="#2f80e"
						>
							Send
						</Button>
						<Text sx={{ marginTop: "5px" }} color="white" size="sm" align="center">
							Back to
							<Anchor to="/auth/login" sx={{ marginLeft: "5px" }} size="sm" component={Link}>
								Sign in
							</Anchor>
						</Text>
					</Paper>
				</form>
			</div>

			{/* <Container sx={{ display: "grid", placeItems: "center", marginTop: 100 }}>
				<Box>
					<Title sx={{ fontWeight: 500, marginBottom: 20 }}>Forgot Password</Title>

					<Paper shadow="1px 1px 2px #222" sx={{ display: "flex", flexDirection: "column", gap: 25, alignItems: "center", padding: "30px 20px" }}>
						<form style={{ width: 350 }} onSubmit={onSubmit(onForgot)}>
							<Flex direction="column" gap={20}>
								<TextInput label="Email address" {...getInputProps("email")} />
								<Button loading={loading} type="submit" sx={{ fontSize: 19, height: 42 }}>
									Reset
								</Button>
							</Flex>
						</form>
					</Paper>
				</Box>
			</Container> */}
		</>
	);
};

export default ForgotPassword;
