import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser } = useAuthContext();
	const location = useLocation();

	const isAuthPage =
		location.pathname === "/login" || location.pathname === "/signup";

	return (
		<div
			className={
				isAuthPage
					? "h-screen flex items-center justify-center px-4"
					: "h-screen"
			}
		>
			<Routes>
				<Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
				<Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
				<Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;