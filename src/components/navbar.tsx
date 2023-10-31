import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Menu } from "@mantine/core";
import { Stack } from "@mui/material";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";

import { useAuth } from "modules/auth/context";
import { logout } from "modules/auth/service";

import { logo } from "../utils/constants";

import Searchbar from "./searchbar";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const Logout = () => {
    logout();
    window.location.href = "/auth/login";
  };

  return (
    <Stack zIndex="100" display="flex" direction="row" flexWrap="wrap" alignItems="center" p={2} sx={{ position: "sticky", background: "#000", top: 0, justifyContent: "space-between" }}>
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
        <h1 className="brand-name">
          <span>ArmiR</span>Tube
        </h1>
      </Link>
      <Searchbar />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px" }}>
        {!user ? (
          <>
            <Link style={{ color: "#fff" }} to="/auth/login" children="Login" />
            <Link style={{ color: "#fff" }} to="/auth/register" children="Register" />
          </>
        ) : (
          <Box sx={{ marginRight: "100px" }}>
            <Menu shadow="md" width="max-content" position="bottom-end">
              <Menu.Target>
                <Avatar sx={{ cursor: "pointer" }} radius="lg" alt="it's me" size="md" {...(user?.avatarURL ? { src: user.avatarURL } : { children: user?.name[0]?.toUpperCase() })} />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label sx={{ fontSize: 15 }} color="lime">
                  Hi 👋🏻 {user?.email}
                </Menu.Label>
                <Menu.Divider />
                <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
                <Menu.Item onClick={Logout} color="red" icon={<IconLogout size={14} />}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Navbar;
