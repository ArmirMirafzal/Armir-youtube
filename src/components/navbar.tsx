import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants";
import Searchbar from "./searchbar";

const Navbar = () => {
	return (
		<Stack
		 zIndex="100"
			display="flex"
			direction="row"
			justifyContent="center"
			flexWrap="wrap"
			alignItems="center"
			p={2}
			sx={{ position: "sticky", background: "#000", top: 0, justifyContent: "space-between" }}
		>
			<Link to="/" style={{ display: "flex", alignItems: "center" }}>
				<img src={logo} alt="logo" height={45} />
				<h1 className="brand-name">
					<span>Armir</span>YouTube
				</h1>
			</Link>
			<Searchbar />
		</Stack>
	);
};

export default Navbar;
