import {Timestamp, doc, getDoc, setDoc} from 'firebase/firestore';
import {userProfiles} from '..';
import {Response} from 'src/@types';

const UpdateStreak = async (uid: string, streak: number, date: Timestamp) => {
  try {
    const docRef = doc(userProfiles, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (streak >= docSnap.data().longestStreak) {
        await setDoc(docRef, {longestStreak: streak}, {merge: true});
      }
      await setDoc(
        docRef,
        {currentStreak: streak, streakLastModified: date},
        {merge: true}
      );
      return {
        status: 'Success',
        message: 'Successfully updated the streak',
        data: {
          currentStreak: streak,
          longestStreak: docSnap.data().longestStreak,
          streakLastModified: date,
        },
      };
    } else {
      return {
        status: 'Error',
        message: 'No such user profile exists',
      };
    }
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to update the streak: ${(error as Error).message}`,
    };
  }
};

const UpdateUserPreferences = async (
  userID: string,
  preferencesObj: object
): Promise<Response<string, string>> => {
  try {
    const docRef = doc(userProfiles, userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, {preferences: preferencesObj}, {merge: true});
      return {
        status: 'Success',
        message: 'Successfully updated preferences',
        data: userID,
      };
    } else {
      return {
        status: 'Error',
        message: 'Doc does not exist',
      };
    }
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to update the user preferences: ${
        (error as Error).message
      }`,
    };
  }
};

export default UpdateStreak;
export {UpdateUserPreferences};
