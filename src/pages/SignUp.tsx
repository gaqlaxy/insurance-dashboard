import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
	const { signUp } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { data, error } = await signUp(email, password);
		if (error) setMessage(error.message);
		else setMessage("Confirmation email sent! Check your inbox.");
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
			<h1 className="text-xl font-bold">Sign Up</h1>
			{message && <div className="text-sm text-red-600">{message}</div>}
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
				className="px-4 py-2 bg-blue-600 text-white rounded"
			>
				Create Account
			</button>
		</form>
	);
}
