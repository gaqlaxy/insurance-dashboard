import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function PasswordReset() {
	const { resetPassword } = useAuth();
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();
		const { data, error } = await resetPassword(email);
		if (error) setMessage(error.message);
		else setMessage("Password reset link sent. Check your email.");
	};

	return (
		<form onSubmit={handleReset} className="max-w-md mx-auto p-4 space-y-4">
			<h1 className="text-xl font-bold">Reset Password</h1>
			{message && <div className="text-sm text-green-600">{message}</div>}
			<input
				type="email"
				placeholder="Your email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full p-2 border rounded"
				required
			/>
			<button
				type="submit"
				className="px-4 py-2 bg-yellow-600 text-white rounded"
			>
				Send Reset Link
			</button>
		</form>
	);
}
