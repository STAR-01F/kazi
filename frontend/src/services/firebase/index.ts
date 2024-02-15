import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './config';
import {getAuth} from 'firebase/auth';
import {collection, getFirestore} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const jobPostings = collection(firestore, 'jobPostings');
const userProfiles = collection(firestore, 'userProfiles');

export {auth, jobPostings, userProfiles};
