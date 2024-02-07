import {Timestamp} from 'firebase/firestore';

type Job = {
  id?: string;
  userid: string;
  title: string;
  description: string;
  company: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  status?: string;
  keywords?: string;
};

export default Job;
