import {Timestamp} from 'firebase/firestore';

type Job = {
  id?: string;
  userid: string;
  title: string;
  description: string;
  company: string;
  jobLink: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  status?: string;
  keywords?: string;
  jobLocation?: {address?: {addressRegion: string; addressCountry: string}};
  hiringOrganization?: {logo: string};
  jobSource?: string;
};

export default Job;
