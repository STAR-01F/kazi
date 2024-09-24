import {Timestamp} from 'firebase/firestore';
import DeletedJobTracker from './deletedJobs';

type UserProfile = {
  id: string;
  jobs: string[];
  streakLastModified?: Timestamp;
  currentStreak: number;
  longestStreak: number;
  deletedJobs: DeletedJobTracker[];
};
export default UserProfile;
