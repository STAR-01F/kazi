import {initializeApp} from 'firebase/app';
import {
GoogleAuthProvider,
getAuth,
signInWithPopup,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
onAuthStateChanged,
signInWithEmailAndPassword,
 // NextOrObserver,
  //User,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

import {firebaseConfig} from './firebase-config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(
      collection(firestoreDB, 'users'),
      where('uid', '==', user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(firestoreDB, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(firestoreDB, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  firestoreDB,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  sendPasswordResetEmail
};

// export const signInUser = async (email: string, password: string) => {
//   if (!email && !password) return;

//   return await signInWithEmailAndPassword(auth, email, password);
// };

// export const userStateListener = (callback: NextOrObserver<User>) => {
//   return onAuthStateChanged(auth, callback);
// };

// export const SignOutUser = async () => await signOut(auth);
