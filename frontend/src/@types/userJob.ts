import {Timestamp} from 'firebase/firestore';

type UserJob = {
  id: string;
  userid: string;
  jobid: string;
  title: string;
  company: string;
  hiringOrganization?: {logo: string};
  status: string;
  statusUpdates: {[key: string]: Timestamp};
  keywords: string;
  jobSource: string;
  notes?: {content: string; updatedAt: Timestamp};
};

export default UserJob;
