import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
	const { signIn } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { data, error } = await signIn(email, password);
		if (error) setErrorMsg(error.message);
		else navigate("/dashboard");
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
			<h1 className="text-xl font-bold">Sign In</h1>
			{errorMsg && <div className="text-sm text-red-600">{errorMsg}</div>}
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full p-2 border rounded"
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="w-full p-2 border rounded"
				required
			/>
			<button
				type="submit"
				className="px-4 py-2 bg-green-600 text-white rounded"
			>
				Log In
			</button>
		</form>
	);
}
