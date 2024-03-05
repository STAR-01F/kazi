type UserJob = {
  id: string;
  userid: string;
  jobid: string;
  title: string;
  company: string;
  logo: string;
  status: string;
  statusUpdates: {[key: string]: Date};
  keywords: string;
  jobSource: string;
};

export default UserJob;
