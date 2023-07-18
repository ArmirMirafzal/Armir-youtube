import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { color } from "../utils/constants";

const Searchbar = () => {
	return (
		<Paper
			component="form"
			onSubmit={() => {}}
			sx={{
				borderRadius: 20,
				border: "1px solid #999999",
				pl: 2,
				boxShadow: "none",
				mr: { sm: 2 },
				backgroundColor: "#2d2d2d5b"
			}}
		>
			<input className="search-bar" placeholder="Search..." value="" onChange={() => {}} />
			<IconButton type="submit" sx={{ p: "10px", color: color.mainColor }}>
				<Search />
			</IconButton>
		</Paper>
	);
};

export default Searchbar;
