import { Navigate, Outlet, Route, Routes as Switch } from "react-router-dom";

import { useAuth } from "modules/auth/context";

import { Action, Auth } from "pages";

import { ChanelDetail, Feed, SearchFeed, VideoDetail } from "../pages/dashboard";

function Routes() {
	const { isAuthenticated, user } = useAuth();
	const isVerified = user?.isVerified || false;

	console.log("routes user", user);

	return (
		<>
			<Switch>
				<Route path="next" element={isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />}>
					<Route index element={<Auth.Register />} />
				</Route>

				<Route path="/" element={<Feed />} />
				<Route path="/video/:id" element={<VideoDetail />} />
				<Route path="/channel/:id" element={<ChanelDetail />} />
				<Route path="/search/:searchTerm" element={<SearchFeed />} />
				<Route path="*" element={<Navigate to="/" />} />

				<Route path="auth" element={isAuthenticated && isVerified ? <Navigate to="/" /> : <Outlet />}>
					<Route path="login" element={<Auth.Login />} />
					<Route path="register" element={<Auth.Register />} />
					<Route path="*" index element={<Navigate to="/auth/login" />} />
				</Route>

				<Route path="/" element={<Feed />} />

				<Route path="forgotPassword" element={!isAuthenticated ? <Auth.ForgotPassword /> : <Navigate to="/next" />} />

				<Route path="action" element={<Action />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Switch>
		</>
	);
}

export default Routes;
