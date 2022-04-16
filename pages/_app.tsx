import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session} refetchInterval={0}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
