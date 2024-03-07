import {UserProfile} from 'firebase/auth';
import {Response} from 'src/@types';
import {userProfiles} from '..';
import {addDoc} from 'firebase/firestore';

const CreateUserProfiles = async (
  userProfile: UserProfile
): Promise<Response<UserProfile, string>> => {
  try {
    const resp = await addDoc(userProfiles, userProfile);

    return {
      status: 'Success',
      message: 'Successfully created the user profile',
      data: {id: resp.id, ...userProfile} as UserProfile,
    };
  } catch {
    return {
      status: 'Error',
      message: 'Failed to create the user profile',
    };
  }
};

export default CreateUserProfiles;
