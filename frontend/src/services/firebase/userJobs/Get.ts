import {doc, getDoc} from 'firebase/firestore';
import {Response} from 'src/@types';
import UserJob from 'src/@types/userJob';
import {userJobs} from '..';
import {GetUserProfileById} from '../userProfiles/Get';

const GetUserJobsByID = async (
  id: string
): Promise<Response<UserJob, string>> => {
  try {
    const docRef = doc(userJobs, id);
    const userJobsData = await getDoc(docRef);
    if (!userJobsData.exists()) {
      return {
        status: 'Error',
        message: 'No such user job exists',
      };
    }
    return {
      status: 'Success',
      message: 'Successfully got the user job',
      data: userJobsData.data() as UserJob,
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to get the user job: ${(error as Error).message}`,
    };
  }
};

const GetUserJobsByUserID = async (
  userid: string
): Promise<Response<UserJob[], string>> => {
  try {
    const userProfileJobsResponse = await GetUserProfileById(userid);
    if (userProfileJobsResponse.status === 'Error') {
      return {
        status: 'Error',
        message: 'Failed to get the user profile',
      };
    }

    const jobDocuments = await Promise.all(
      userProfileJobsResponse.data.jobs.map((jobid) => {
        const jobDocRef = doc(userJobs, jobid);
        return getDoc(jobDocRef);
      })
    );

    const jobList = jobDocuments.map((jobDoc) => {
      return {id: jobDoc.id, ...jobDoc.data()} as UserJob;
    });

    return {
      status: 'Success',
      message: 'Successfully retrieved the jobs',
      data: jobList,
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to get the jobs: ${(error as Error).message}`,
    };
  }
};
export {GetUserJobsByID, GetUserJobsByUserID};
