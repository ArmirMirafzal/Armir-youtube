import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";

import { color } from "../utils/constants";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const onhandleSubmit = (e: any) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);

      setSearchTerm("");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={onhandleSubmit}
      sx={{
        borderRadius: 20,
        border: "1px solid #999999",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 2, xs: "40px" },
        backgroundColor: "#2d2d2d5b",
      }}
    >
      <input className="search-bar" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <IconButton type="submit" sx={{ p: "10px", color: color.mainColor }}>
        <Search />
      </IconButton>
    </Paper>
  );
};

export default Searchbar;
