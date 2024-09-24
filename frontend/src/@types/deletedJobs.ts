import {Timestamp} from 'firebase/firestore';

type DeletedJobTracker = {
  company: string;
  jobid: string;
  deletedState: string;
  date: Timestamp;
};

export default DeletedJobTracker;
