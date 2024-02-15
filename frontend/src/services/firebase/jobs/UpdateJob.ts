import {doc, getDoc, setDoc} from 'firebase/firestore';
import {jobPostings} from '..';
import {Job} from 'src/@types';

const UpdateJob = async (userId: string, job: Partial<Job>) => {
  try {
    const docRef = doc(jobPostings, job.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().userid === userId) {
      await setDoc(docRef, job, {merge: true});
      return {
        status: 'Success',
        message: 'Successfully updated the job',
        data: job.id,
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

export {UpdateJob};
