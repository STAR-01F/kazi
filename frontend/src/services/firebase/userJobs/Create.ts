import {Timestamp, addDoc, arrayUnion, doc, setDoc} from 'firebase/firestore';
import {firestore, userJobs} from '..';
import {Job, Response} from 'src/@types';
import UserJob from 'src/@types/userJob';

const CreateUserJob = async (
  userid: string,
  jobStatus: string,
  job: Job
): Promise<Response<UserJob, string>> => {
  const createdAt = Timestamp.now();
  const s = {
    [jobStatus]: createdAt,
  };
  if (jobStatus !== 'Saved') {
    s['Saved'] = createdAt;
  }
  const userJobsData = {
    userid: userid,
    jobid: job.id || '',
    title: job.title,
    company: job.company,
    hiringOrganization: {
      logo: job.hiringOrganization?.logo || job?.companyLogoURL,
    },
    jobSource: job.jobSource || '',
    status: jobStatus,
    statusUpdates: s,
  };
  try {
    const respUserJobs = await addDoc(userJobs, userJobsData);
    const userJobsDoc = doc(firestore, 'userProfiles', userid);

    const respUserProfiles = await setDoc(
      userJobsDoc,
      {
        id: userid,
        jobs: arrayUnion(respUserJobs.id),
      },
      {merge: true}
    );
    console.log('UserProfiles', respUserProfiles);
    return {
      status: 'Success',
      message: 'Successfully created the job',
      data: {id: respUserJobs.id, ...userJobsData} as UserJob,
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to create the user job: ${(error as Error).message}`,
    };
  }
};

export default CreateUserJob;
