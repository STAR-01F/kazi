import UserProfiles from 'src/@types/userProfiles';
import {userProfiles} from '..';
import {Response} from 'src/@types';
import {doc, getDoc} from 'firebase/firestore';

const GetUserProfileById = async (
  userId: string
): Promise<Response<UserProfiles, string>> => {
  try {
    const docRef = doc(userProfiles, userId);
    const userProfileData = await getDoc(docRef);
    if (!userProfileData.exists()) {
      return {
        status: 'Error',
        message: 'No such user profile exists',
      };
    }
    return {
      status: 'Success',
      message: 'Successfully got the user profile',
      data: userProfileData.data() as UserProfiles,
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to get the user profile: ${(error as Error).message}`,
    };
  }
};
export {GetUserProfileById};
