import {Response} from 'src/@types';
import {userJobs} from '..';
import {Timestamp, doc, getDoc, setDoc} from 'firebase/firestore';
import InterviewQ from 'src/@types/interviewQ';

const SaveIQs = async (
  userJobId: string,
  iqs: InterviewQ
): Promise<Response<InterviewQ, string>> => {
  try {
    const docRef = doc(userJobs, userJobId);
    const docSnap = await getDoc(docRef);
    const updatedAt = Timestamp.now();
    if (docSnap.exists()) {
      if (docSnap.get('interviewQs')) {
        return {
          status: 'Success',
          message: `IQs pre-exist`,
          data: docSnap.data() as InterviewQ,
        };
      } else {
        await setDoc(
          docRef,
          {
            interviewQs: iqs,
            iQsAdded: updatedAt,
          },
          {merge: true}
        );
      }
      return {
        status: 'Success',
        message: `Successfully saved interview questions`,
        data: {} as InterviewQ,
      };
    }
    return {
      status: 'Error',
      message: 'Unable to save IQs, document does not exist',
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to save interview questions: ${
        (error as Error).message
      }`,
    };
  }
};

export {SaveIQs};

export default SaveIQs;
