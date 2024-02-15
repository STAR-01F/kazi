import {jobPostings} from '@services/firebase';
import {Response} from 'src/@types';
import {query, where, getDocs} from 'firebase/firestore';

async function GetAllDocs(
  userID: string
): Promise<Response<string[], unknown>> {
  try {
    const q = query(jobPostings, where('userid', '==', userID));
    const querySnapshot = await getDocs(q);
    const idArr: string[] = [];

    querySnapshot.forEach((doc) => {
      idArr.push(doc.id);
    });

    return {
      status: 'Success',
      message: 'Successfully retrieved all jobs',
      data: idArr,
    };

  } catch (e: any) {
    return {
      status: 'Error',
      message: 'Failed to get all jobs, err: ' + e,
    };
  }
}

export {GetAllDocs};
