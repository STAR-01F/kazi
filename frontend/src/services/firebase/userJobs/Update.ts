import {Response} from 'src/@types';
import {userJobs} from '..';
import {Timestamp, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';

const UpdateUserJobStatus = async (
  userJobId: string,
  status: string
): Promise<Response<string, string>> => {
  try {
    const docRef = doc(userJobs, userJobId);
    const docSnap = await getDoc(docRef);
    const updatedAt = Timestamp.now();
    if (docSnap.exists()) {
      // await setDoc(docRef, job, {merge: true});
      if (status === 'Saved') {
        await updateDoc(docRef, {status: status});
      } else {
        await setDoc(
          docRef,
          {
            status: status,
            statusUpdates: {[status]: updatedAt},
          },
          {merge: true}
        );
      }
      return {
        status: 'Success',
        message: `Successfully updated the job status to ${status}`,
        data: userJobId,
      };
    }
    return {
      status: 'Success',
      message: 'Successfully updated the user job status',
      data: 'User Job Status Updated',
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to update the user job status: ${
        (error as Error).message
      }`,
    };
  }
};

export default UpdateUserJobStatus;
