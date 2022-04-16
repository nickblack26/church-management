import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import 'firebase/firestore';
import { signin } from '../../../firebase.js';

export default NextAuth({
	providers: [
		CredentialsProvider({
			id: 'firebase',
			name: 'firebase',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'Email' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				const payload = {
					email: credentials.email,
					password: credentials.password,
				};
				try {
					await signin(payload.email, payload.password);
					if (user) {
						return { status: 'success', data: user };
					}
				} catch (error) {
					const errorMessage = error.response.data.message;
					throw new Error(
						errorMessage + '&email=' + credentials.email
					);
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		async session({ session, token, user }) {
			session.user.uid = token.sub;
			return session;
		},
	},
});
