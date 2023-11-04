import { Stack, Typography } from "@mui/material";
import { categories } from "utils/constants";

interface SidebarProps {
	selectedCategory: string;
	setSelectedCategory: (name: string) => void;
}

const Sidebar = ({ selectedCategory, setSelectedCategory }: SidebarProps) => (
	<Stack
		direction="row"
		sx={{
			padding: "10px",
			overflowY: "auto",
			scrollbarWidth: 0,
			zIndex: "-1",
			height: { sx: "auto", md: "90%" },
			flexDirection: { md: "column" },
		}}
	>
		{categories.map((category) => (
			<button
				key={category.name}
				className={`category-btn ${category.name === selectedCategory && "category-btn-changed"}`}
				style={{ color: "white" }}
				onClick={() => setSelectedCategory(category.name)}
			>
				<span
					style={{
						color: category.name === selectedCategory ? "white" : "red",
						marginRight: "15px",
					}}
				>
					{category.icon}
				</span>
				<span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}>{category.name}</span>
			</button>
		))}

		<Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff" }}>
			ArmiR © 2023 Youtube Clone
		</Typography>
	</Stack>
);

export default Sidebar;
