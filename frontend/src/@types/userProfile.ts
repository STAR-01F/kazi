import {Timestamp} from 'firebase/firestore';

type UserProfile = {
  id: string;
  jobs: string[];
  streakLastModified?: Timestamp;
  currentStreak: number;
  longestStreak: number;
};
export default UserProfile;
