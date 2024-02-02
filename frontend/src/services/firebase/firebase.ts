import {initializeApp} from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import {firebaseConfig} from './firebase-config';
import {Response} from 'src/@types';
import type {UserCredential} from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<
  Response<UserCredential, unknown>
> => {
  try {
    const resultFromPopup = await signInWithPopup(auth, googleProvider);
    const user = resultFromPopup.user;

    if (user.providerId) {
      return {
        status: 'Success',
        message: 'Successfully authenticated with Google',
        data: resultFromPopup,
      };
    }
    return {
      status: 'Error',
      message: 'Provider id is null or undefined',
    };
  } catch (err: any) {
    console.error('Errror from google auth', err);
    return {
      status: 'Error',
      message: 'Failed to authenticate user with Google',
    };
  }
};

const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Response<UserCredential, unknown>> => {
  try {
    if (!email && !password)
      return {
        status: 'Error',
        message: 'Both email and password fields are required',
      };
    const resultFromLoginWithEmail = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = resultFromLoginWithEmail.user;

    if (user.providerId) {
      return {
        status: 'Success',
        message: 'Successfully logged in with email',
        data: resultFromLoginWithEmail,
      };
    }

    return {
      status: 'Error',
      message: 'Provider id is null or undefined',
    };
  } catch (err: any) {
    console.error('error from logInWithEmailAndPassword', err);
    return {
      status: 'Error',
      message: 'Failed to login with email',
    };
  }
};

const registerWithEmailAndPassword = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<Response<UserCredential, unknown>> => {
  try {
    const resultFromEmailPassReg = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = resultFromEmailPassReg.user;

    if (user.providerId) {
      updateProfile(user, {displayName: `${firstname} ${lastname}`})
        .then(() => {
          console.log('displayName successfully added');
        })
        .catch((error) => {
          console.error('Failed to add displayName', error);
        });
      return {
        status: 'Success',
        message: 'Successfully registered with email',
        data: resultFromEmailPassReg,
      };
    }
    return {
      status: 'Error',
      message: 'From register, provider id is null or undefined',
    };
  } catch (err: any) {
    console.error('Error from register with email', err);
    return {
      status: 'Error',
      message: 'Failed to register user with Email',
    };
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err: any) {
    console.error(err);
  }
};

const logout = async () => {
  await signOut(auth);
};

export {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  sendPasswordResetEmail,
};
