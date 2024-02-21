import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {jobPostings} from '..';

const UpdateJobStatus = async (
  userId: string,
  jobId: string,
  status: string
) => {
  try {
    const docRef = doc(jobPostings, jobId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().userid === userId) {
      // await setDoc(docRef, job, {merge: true});
      await updateDoc(docRef, {status: status});
      return {
        status: 'Success',
        message: `Successfully updated the job status to ${status}`,
        data: jobId,
      };
    } else {
      return {
        status: 'Error',
        message: 'No such job exists',
      };
    }
  } catch (error) {
    return {
      status: 'Error',
      message: 'Failed to update the job' + (error as Error).message,
    };
  }
};

export {UpdateJobStatus};
