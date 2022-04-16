import React, { useRef } from 'react';
import { Provider } from 'next-auth/providers';
import { signIn, getProviders } from 'next-auth/react';
import styles from './login.module.css';
import Image from 'next/image';
import { signin } from '../../firebase';

interface Props {
	providers: [Provider];
}

// server side render
export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}

const Login = ({ providers }: Props) => {
	const emailRef = useRef();
	const passwordRef = useRef();

	async function handleLogin(e) {
		e.preventDefault();

		const res = await signIn('credentials', {
			redirect: false,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			callbackUrl: '/',
		});
	}

	return (
		<main className={styles.pageWrap}>
			<figure className={styles.loginDecoration} />
			<section className={styles.loginWrap}>
				<header className={styles.sectionWrap}>
					<Image src='/logo.svg' height={64} width={64} />
					<h1>Hello Again!</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</p>
				</header>
				<div className={styles.sectionWrap}>
					<input
						type='email'
						name='email'
						ref={emailRef}
						placeholder='Email'
						className={styles.loginInput}
					/>
					<input
						type='password'
						name='password'
						ref={passwordRef}
						placeholder='Password'
						className={styles.loginInput}
					/>
				</div>
				<div className={styles.sectionWrap}>
					{Object.values(providers).map((provider) => (
						<div key={provider.id}>
							{provider.id === 'firebase' && (
								<button
									className={styles.loginButton}
									onClick={handleLogin}
								>
									Login
								</button>
							)}
							{provider.id === 'google' && (
								<button
									className={styles.googleButton}
									onClick={() =>
										signIn(provider.id, {
											callbackUrl: '/',
										})
									}
								>
									Sign in with {provider.name}
								</button>
							)}
						</div>
					))}
				</div>
			</section>
		</main>
	);
};

export default Login;
