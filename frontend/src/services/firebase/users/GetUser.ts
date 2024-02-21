import {getDocs} from '@firebase/firestore';
import {userProfiles} from '..';
import {Response} from 'src/@types';
import User from 'src/@types/user';

const GetProfileByUserID = async (
  userid: string
): Promise<Response<User[], unknown>> => {
  try {
    const snapshot = await getDocs(userProfiles);
    const jobList: User[] = snapshot.docs
      .filter((doc) => doc.data().id === userid)
      .map((doc) => ({ id: doc.id, ...doc.data() } as User));
    return {
      status: 'Success',
      message: 'Successfully getting the jobs',
      data: jobList,
    };
  } catch {
    return {
      status: 'Error',
      message: 'Failed to get the jobs',
    };
  }
}

export {GetProfileByUserID};