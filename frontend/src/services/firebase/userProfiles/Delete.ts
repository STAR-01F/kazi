import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {userProfiles} from '..';
import {Response} from 'src/@types';
import {DeleteUserByUserAuth} from '../auth';
import {User} from 'firebase/auth';
import {DeleteUserJob} from '../userJobs';

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

const DeleteUserProfileByUserId = async (
  user: User
): Promise<Response<string, string>> => {
  try {
    const docRef = doc(userProfiles, user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data?.jobs) {
        for (const jobId of data.jobs) {
          await DeleteUserJob(user.uid, jobId);
        }
      }
      await deleteDoc(docRef);
    }
    const resp = await DeleteUserByUserAuth(user);
    if (resp.status === 'Error') {
      return resp;
    }
    return {
      status: 'Success',
      message: 'Successfully deleted the user profile',
      data: '',
    };
  } catch {
    return {
      status: 'Error',
      message: `Failed to delete the user profile job`,
    };
  }
};

export {DeleteUserProfileJobById, DeleteUserProfileByUserId};
