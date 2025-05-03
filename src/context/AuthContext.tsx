// import React, { createContext, useContext, useEffect, useState } from "react";
// import {
// 	Session,
// 	User,
// 	AuthResponse,
// 	Provider,
// 	SessionChangeCallback,
// } from "@supabase/supabase-js";
// import { supabase } from "../supabaseClient";

// interface AuthContextType {
// 	user: User | null;
// 	session: Session | null;
// 	signUp: (email: string, password: string) => Promise<AuthResponse>;
// 	signIn: (email: string, password: string) => Promise<AuthResponse>;
// 	signOut: () => Promise<void>;
// 	resetPassword: (email: string) => Promise<{ data: any; error: any }>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
// 	children,
// }) => {
// 	const [session, setSession] = useState<Session | null>(null);

// 	useEffect(() => {
// 		// Get initial session
// 		supabase.auth.getSession().then(({ data: { session } }) => {
// 			setSession(session);
// 		});

// 		// Listen for changes
// 		const { data: listener } = supabase.auth.onAuthStateChange(
// 			(_event, session) => setSession(session),
// 		);

// 		return () => {
// 			listener.subscription.unsubscribe();
// 		};
// 	}, []);

// 	const signUp = (email: string, password: string) =>
// 		supabase.auth.signUp({ email, password });

// 	const signIn = (email: string, password: string) =>
// 		supabase.auth.signInWithPassword({ email, password });

// 	// const signOut = () => supabase.auth.signOut();
// 	const signOut = async () => {
// 		await supabase.auth.signOut();
// 	};

// 	const resetPassword = (email: string) =>
// 		supabase.auth.resetPasswordForEmail(email, {
// 			// redirectTo: window.location.origin + "/reset-password",
// 			redirectTo: `${window.location.origin}/reset-password`,
// 		});

// 	return (
// 		<AuthContext.Provider
// 			value={{
// 				user: session?.user ?? null,
// 				session,
// 				signUp,
// 				signIn,
// 				signOut,
// 				resetPassword,
// 			}}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };

// export const useAuth = (): AuthContextType => {
// 	const ctx = useContext(AuthContext);
// 	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
// 	return ctx;
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import type {
	Session,
	User,
	AuthChangeEvent,
	AuthResponse,
	Session as SupabaseSession,
} from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

interface AuthContextType {
	user: User | null;
	session: Session | null;
	// signUp: (email: string, password: string) => Promise<any>;
	signUp: (email: string, password: string) => Promise<AuthResponse>;
	signIn: (email: string, password: string) => Promise<any>;
	signOut: () => Promise<any>;
	resetPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [session, setSession] = useState<SupabaseSession | null>(null);

	// 1. Load initial session (from Supabase, which uses localStorage)
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
	}, []);

	// 2. Subscribe to auth changes
	useEffect(() => {
		const { data: subscription } = supabase.auth.onAuthStateChange(
			(_event: AuthChangeEvent, session) => {
				setSession(session);
				// 3. Optional backup in localStorage
				if (session) {
					localStorage.setItem("sb-session", JSON.stringify(session));
				} else {
					localStorage.removeItem("sb-session");
				}
			},
		);

		// Clean up
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
			// redirectTo: window.location.origin + "/reset-password",
			redirectTo: `${window.location.origin}/reset-password`,
		});

	return (
		<AuthContext.Provider
			value={{
				user: session?.user ?? null,
				session,
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
