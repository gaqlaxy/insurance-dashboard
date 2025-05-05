import React, { createContext, useContext, useEffect, useState } from "react";
import type {
	Session,
	User,
	AuthChangeEvent,
	AuthResponse,
} from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

interface AuthContextType {
	user: User | null;
	session: Session | null;
	loading: boolean; // ✅ Added to interface
	signUp: (email: string, password: string) => Promise<AuthResponse>;
	signIn: (email: string, password: string) => Promise<any>;
	signOut: () => Promise<any>;
	resetPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	// Load initial session
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session }, error }) => {
			if (error) console.error("Initial session error:", error);
			setSession(session);
			setLoading(false);
		});
	}, []);

	// Subscribe to auth changes
	useEffect(() => {
		const { data: subscription } = supabase.auth.onAuthStateChange(
			(_event: AuthChangeEvent, session) => {
				setSession(session);
				if (session) {
					localStorage.setItem("sb-session", JSON.stringify(session));
				} else {
					localStorage.removeItem("sb-session");
				}
			},
		);

		return () => {
			subscription.subscription.unsubscribe();
		};
	}, []);

	const signUp = (email: string, password: string) =>
		supabase.auth.signUp({ email, password });

	const signIn = (email: string, password: string) =>
		supabase.auth.signInWithPassword({ email, password });

	const signOut = () => supabase.auth.signOut();

	const resetPassword = (email: string) =>
		supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/reset-password`,
		});

	return (
		<AuthContext.Provider
			value={{
				user: session?.user ?? null,
				session,
				loading, 
				signUp,
				signIn,
				signOut,
				resetPassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
};
