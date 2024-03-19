// import {UserProfile} from 'firebase/auth';
import {Response} from 'src/@types';
import {userProfiles} from '..';
import UserProfile from 'src/@types/userProfile';

import {addDoc} from 'firebase/firestore';

const CreateUserProfile = async (
  userProfile: UserProfile
): Promise<Response<UserProfile, string>> => {
  try {
    const resp = await addDoc(userProfiles, userProfile);

    return {
      status: 'Success',
      message: 'Successfully created the user profile',
      data: {resp, ...userProfile} as UserProfile,
    };
  } catch {
    return {
      status: 'Error',
      message: 'Failed to create the user profile',
    };
  }
};

export default CreateUserProfile;
