import {deleteDoc, doc, getDoc} from 'firebase/firestore';
import {Response} from 'src/@types';
import {userJobs} from '..';
import {DeleteUserProfileJobById} from '../userProfiles';

const DeleteUserJob = async (
  userId: string,
  id: string
): Promise<Response<string, string>> => {
  try {
    const docRef = doc(userJobs, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);
      const deletedJob = await DeleteUserProfileJobById(userId, id);
      return deletedJob;
    }
    return {
      status: 'Success',
      message: 'Successfully deleted the job',
      data: id,
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to delete the job: ${(error as Error).message}`,
    };
  }
};
export default DeleteUserJob;
