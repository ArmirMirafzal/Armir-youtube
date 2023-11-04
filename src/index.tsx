import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import { Routes } from "routes";

import * as Containers from "containers";

import "./assets/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const theme = createTheme();

root.render(
	<MantineProvider withNormalizeCSS>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Containers.Auth>
					<Box sx={{ backgroundColor: "#000" }}>
						<Routes />
					</Box>
					<Notifications position="top-right" />
				</Containers.Auth>
			</BrowserRouter>
		</ThemeProvider>
	</MantineProvider>
);

/*

"dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.10.0",
    "@mantine/core": "6.0.20",
    "@mantine/form": "^6.0.19",
    "@mantine/hooks": "6.0.20",
    "@mantine/notifications": "6.0.20",
    "@mui/icons-material": "^5.8.4",
    "@mui/material": "^5.9.3",
    "@tabler/icons-react": "^2.31.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.38",
    "@types/query-string": "^6.3.0",
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "axios": "^0.27.2",
    "bootstrap": "^5.3.0",
    "classnames": "^2.3.2",
    "env-cmd": "^10.1.0",
    "firebase": "^10.2.0",
    "lodash": "^4.17.21",
    "query-string": "^8.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.10.1",
    "react-player": "^2.10.1",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "sass": "^1.66.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4",
    "yup": "^1.2.0"
  },


*/
