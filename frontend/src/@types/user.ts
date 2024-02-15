import {Timestamp} from 'firebase/firestore';

type User = {
  id: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  jobStatus?: string;
  jobLocation?: string;
  jobStart?: string;
  jobIndustry?: string;
  jobLevel?: string;
};

export default User;
