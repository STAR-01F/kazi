import {
  UserProfileContext,
  UserProfileContextType,
} from './../context/UserProfile';
import {useContext} from 'react';

export const useProfile = (): UserProfileContextType => {
  const profileContext = useContext(UserProfileContext);
  if (!profileContext) {
    throw new Error('useJobs must be used within a UserProfileProvider');
  }
  return profileContext;
};
