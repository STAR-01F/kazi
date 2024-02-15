import User from 'src/@types/user';
import {userProfiles} from '..';
import {Timestamp, addDoc} from 'firebase/firestore';

const CreateProfile = async (user: Partial<User>) => {
  if (!user.id) return {status: 'Error', message: 'User ID is empty'};

  try {
    const createdAt = Timestamp.now();
    const updatedAt = Timestamp.now();
    user.createdAt = createdAt;
    user.updatedAt = updatedAt;
    const resp = await addDoc(userProfiles, user);

    return {
      status: 'Success',
      message: 'Successfully created the user profile',
      data: {id: resp.id, ...user},
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to create the user profile: ${(error as Error).message}`,
    };
  }
};

export {CreateProfile};
