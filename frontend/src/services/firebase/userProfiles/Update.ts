import {Timestamp, doc, getDoc, setDoc} from 'firebase/firestore';
import {userProfiles} from '..';

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

export default UpdateStreak;
