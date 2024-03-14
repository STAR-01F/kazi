import React, {createContext, useEffect, useState} from 'react';
import {UserProfiles} from 'src/@types';
import {GetUserProfileById} from '../userProfiles';
import {userProfiles} from '..';

export interface UserProfileContextType {
  userProfile: UserProfiles | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfiles | null>>;
  loading: boolean;
}

export const UserProfileContext = createContext<
  UserProfileContextType | undefined
>(undefined);

interface UserProfileProviderProps {
  children: React.ReactNode;
}

export const UserProfileProvider = ({
  children,
}: UserProfileProviderProps): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfiles | null>(null);
  const [loading, setLoading] = useState(true);
  const userP = GetUserProfileById(userProfiles.id);

  useEffect(() => {
    console.log('userP', userP);
    setUserProfile({
      id: userProfiles.id,
      jobs: [],
      currentStreak: 0,
      longestStreak: 0,
    });
    setLoading(false);
  }, [userP, loading]);
  return (
    <UserProfileContext.Provider value={{userProfile, setUserProfile, loading}}>
      {children}
    </UserProfileContext.Provider>
  );
};
