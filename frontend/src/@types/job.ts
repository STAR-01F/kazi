import {Timestamp} from 'firebase/firestore';

type Job = {
  id?: string;
  userid: string;
  title: string;
  description: string;
  company: string;
  joblink: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  status?: string;
  keywords?: string;
  joblocation?: {address?: {addressRegion: string; addressCountry: string}};
  hiringorganization?: {logo: string};
  jobsource?: string;
};

export default Job;
