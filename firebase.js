// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDY44SZOwa22HMx2vcfhcOrfsYt0TqVzb4',
	authDomain: 'church-management-a0dbc.firebaseapp.com',
	projectId: 'church-management-a0dbc',
	storageBucket: 'church-management-a0dbc.appspot.com',
	messagingSenderId: '793757161857',
	appId: '1:793757161857:web:43437249516c4e33b43080',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
