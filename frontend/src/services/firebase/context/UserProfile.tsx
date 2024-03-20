import React, {createContext, useEffect, useState} from 'react';
import UserProfile from 'src/@types/userProfile';
import {GetUserProfileById} from '../userProfiles';
import {useAuth} from '../hooks/useAuth';
import UpdateStreak from '../userProfiles/Update';

export interface UserProfileContextType {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  useEffect(() => {
    if (!user) return;
    const GetUserProfiles = async () => {
      try {
        const resp = await GetUserProfileById(user.uid);
        if (resp.status === 'Success') {
          if (resp.data && resp.data.streakLastModified) {
            const today = new Date(new Date().setHours(0, 0, 0, 0));
            const streakDay = resp.data?.streakLastModified?.toDate() || today;

            //check difference between today and streakDay
            const timeDiff =
              (today.setHours(0, 0, 0, 0) - streakDay?.setHours(0, 0, 0, 0)) /
              1000 /
              60 /
              60;

            if (resp.data?.streakLastModified !== undefined && timeDiff > 24) {
              setUserProfile({
                ...resp.data,
                currentStreak: 0,
              });
              UpdateStreak(resp.data.id, 0, resp.data.streakLastModified);
            } else {
              setUserProfile({
                ...resp.data,
                currentStreak: resp.data.currentStreak,
              });
            }
          }
        } else {
          setUserProfile(null);
        }
        console.log('4');
        setLoading(false);
      } catch (error) {
        setUserProfile(null);
        console.error('Error getting user profile:', error);
      }
    };
    GetUserProfiles();
  }, [user, loading]);
  return (
    <UserProfileContext.Provider value={{userProfile, setUserProfile, loading}}>
      {children}
    </UserProfileContext.Provider>
  );
};
