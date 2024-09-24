import {Timestamp} from 'firebase/firestore';
import InterviewQ from './interviewQ';

type UserJob = {
  id: string;
  userid: string;
  jobid: string;
  title: string;
  company: string;
  hiringOrganization?: {logo: string};
  interviewQs: InterviewQ;
  status: string;
  statusUpdates: {[key: string]: Timestamp};
  statusTracker: {
    Saved: boolean;
    Applied: boolean;
    Interview: boolean;
    Rejected: Boolean;
    Offer: boolean;
  };
  keywords?: Array<string>;
  jobSource: string;
  notes?: {content: string; updatedAt: Timestamp};
};

export default UserJob;
