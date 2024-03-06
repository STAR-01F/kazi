import {arrayRemove, doc, getDoc, updateDoc} from 'firebase/firestore';
import {userProfiles} from '..';
import {Response} from 'src/@types';

const DeleteUserProfileJobById = async (
  userId: string,
  jobId: string
): Promise<Response<string, string>> => {
  try {
    const docRef = doc(userProfiles, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        jobs: arrayRemove(jobId),
      });
      return {
        status: 'Success',
        message: 'Successfully deleted the user profile job',
        data: jobId,
      };
    }
    return {
      status: 'Error',
      message: `User profile with id ${userId} does not exist`,
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to delete the user profile job: ${
        (error as Error).message
      }`,
    };
  }
};

export {DeleteUserProfileJobById};
