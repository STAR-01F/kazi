import {Timestamp} from 'firebase/firestore';

type Job = {
  id?: string;
  userid: string;
  title: string;
  description: string;
  company: string;
  joblink: string;
  createdat?: Timestamp;
  updatedat?: Timestamp;
  notes?: string;
  status?: string;
  keywords?: string;
  joblocation?: {address?: {addressRegion: string; addressCountry: string}};
  hiringorganization?: {logo: string};
  jobsource?: string;
};

export default Job;
