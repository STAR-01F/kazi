import {doc, getDoc, getDocs} from 'firebase/firestore';
import {jobPostings} from '..';
import {Job, Response} from 'src/@types';

const GetJobByJobID = async (
  jobid: string
): Promise<Response<Job, unknown>> => {
  try {
    const docRef = doc(jobPostings, jobid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const lowerCaseData = Object.keys(data).reduce((acc, key) => {
        acc[key.toLowerCase()] = data[key];
        return acc;
      }, {} as Record<string, unknown>);
      return {
        status: 'Success',
        message: 'Successfully got the job',
        data: {id: docSnap.id, ...lowerCaseData} as Job,
      };
    } else {
      return {
        status: 'Error',
        message: 'No such job exists',
      };
    }
  } catch {
    return {
      status: 'Error',
      message: 'Failed to get the jobs',
    };
  }
};

const GetJobsByUserID = async (
  userid: string
): Promise<Response<Job[], unknown>> => {
  try {
    const snapshot = await getDocs(jobPostings);
    const jobList: Job[] = snapshot.docs
      .filter((doc) => doc.data().userid === userid)
      .map((doc) => ({id: doc.id, ...doc.data()} as Job));
    return {
      status: 'Success',
      message: 'Successfully getting the jobs',
      data: jobList,
    };
  } catch {
    return {
      status: 'Error',
      message: 'Failed to get the jobs',
    };
  }
};

export {GetJobByJobID, GetJobsByUserID};
