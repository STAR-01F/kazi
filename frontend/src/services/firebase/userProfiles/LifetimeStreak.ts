import {doc, getDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {userProfiles} from '..';
import {Response} from 'src/@types';
import DeletedJobTracker from 'src/@types/deletedJobs';

//should be called when a job is deleted to update lifetime tallies
//Track jobs name and state on at point of deletion
//valid states == 'Saved' 'Applied' 'Interview' 'Rejected' 'Offer'
const UpdateMetricsOnDeletion = async (
  uid: string,
  data: DeletedJobTracker
): Promise<Response<string, string>> => {
  try {
    const docRef = doc(userProfiles, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        deletedJobs: arrayUnion(data),
      });

      return {
        status: 'Success',
        message: `Job deleted and updated`,
        data: '',
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
      message: `Failed to update the user preferences: ${
        (error as Error).message
      }`,
    };
  }
};

export default UpdateMetricsOnDeletion;
