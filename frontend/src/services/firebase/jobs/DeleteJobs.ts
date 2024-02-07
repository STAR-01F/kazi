import {deleteDoc, doc, getDoc} from 'firebase/firestore';
import {jobPostings} from '..';
import {Response} from 'src/@types';

const DeleteJobs = async (
  userId: string,
  jobId: string
): Promise<Response<string, unknown>> => {
  try {
    const docRef = doc(jobPostings, jobId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().userid === userId) {
      await deleteDoc(docRef);
      return {
        status: 'Success',
        message: 'Successfully deleted the job',
        data: jobId,
      };
    } else {
      return {
        status: 'Error',
        message: 'No such job exists',
      };
    }
  } catch {
    return {
      status: 'Error',
      message: 'Failed to delete the job',
    };
  }
};

export {DeleteJobs};
