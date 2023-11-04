import React from "react";
import { Link } from "react-router-dom";
import { Title } from "@mantine/core";
import { logoIcon } from "utils/constants";

interface LogoProps {
	size?: number;
}

const logo = ({ size }: LogoProps) => (
	<>
		<Link to="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: `${size ? size - 10 : 0}` }}>
			<img src={logoIcon} alt="logo" height={size ? size + 10 : 45} />
			<Title sx={{ fontSize: size }} className="brand-name">
				<span>ArmiR</span>Tube
			</Title>
		</Link>
	</>
);

export default logo;
