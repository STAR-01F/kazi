import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  GithubAuthProvider,
  deleteUser,
} from 'firebase/auth';

import {FirebaseError} from 'firebase/app';

import {Response} from 'src/@types';
import type {User, UserCredential} from 'firebase/auth';
import {auth} from '..';
import {actionCodeConfig} from './actionConfig';

const signInWithGithub = async (): Promise<
  Response<UserCredential, unknown>
> => {
  try {
    const githubAuthProvider = new GithubAuthProvider();
    const resultFromPopup = await signInWithPopup(auth, githubAuthProvider);
    const {user} = resultFromPopup;
    if (user.providerId) {
      return {
        status: 'Success',
        message: 'Successfully authenticated with GitHub',
        data: resultFromPopup,
      };
    }
    return {
      status: 'Error',
      message: 'Provider id is null or undefined',
    };
  } catch (e) {
    return {
      status: 'Error',
      message: 'Failed to authenticate user with GitHub',
    };
  }
};
const signInWithGoogle = async (): Promise<
  Response<UserCredential, unknown>
> => {
  try {
    const googleProvider = new GoogleAuthProvider();
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
  } catch (err: unknown) {
    return {
      status: 'Error',
      message: (err as FirebaseError).code,
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
  } catch (err: unknown) {
    return {
      status: 'Error',
      message: (err as FirebaseError).code,
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
    await sendEmailVerification(user, actionCodeConfig);

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
  } catch (err: unknown) {
    return {
      status: 'Error',
      message: (err as FirebaseError).code,
    };
  }
};

const sendPasswordReset = async (
  email: string
): Promise<Response<string, string>> => {
  const actionCodeSettings = {
    url: import.meta.env.VITE_RESET_EMAIL_REDIRECT,
    handleCodeInApp: false,
  };
  try {
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    return {
      status: 'Success',
      message: 'Password reset email sent successfully',
      data: 'Password reset email sent successfully',
    };
  } catch (err: unknown) {
    return {
      status: 'Error',
      message: (err as FirebaseError).code,
    };
  }
};

const logout = async () => {
  await signOut(auth);
};

const DeleteUserByUserAuth = async (
  user: User
): Promise<Response<string, string>> => {
  try {
    await deleteUser(user);
    return {
      status: 'Success',
      message: 'Successfully deleted the user',
      data: '',
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to delete the user: ${(error as Error).message}`,
    };
  }
};

const sendEmailVerificationCode = async (
  user: User | null
): Promise<Response<string, string>> => {
  try {
    if (user) {
      await sendEmailVerification(user, actionCodeConfig);
      return {
        status: 'Success',
        message: 'Verification email sent successfully',
        data: 'Verification email sent successfully',
      };
    }
    return {
      status: 'Error',
      message: 'No user found',
    };
  } catch (err: unknown) {
    return {
      status: 'Error',
      message: (err as FirebaseError).code,
    };
  }
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  sendPasswordResetEmail,
  signInWithGithub,
  DeleteUserByUserAuth,
  sendEmailVerificationCode,
};
