import Keywords from 'src/@types/keyword';
import type {Job, Response} from 'src/@types';
import InterviewQs from 'src/@types/interviewQ';
/**
 * Retrieves keywords for a given description.
 * @param description - The description for which to retrieve keywords.
 */
const getKeywords = async (
  description: string
): Promise<Response<Keywords['keywords'], unknown>> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_OPENAI_HOST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: description,
      }),
    });
    const data = await response.json();

    if (data.error || !response.ok) {
      return {
        status: 'Error',
        message: 'Failed to generate keywords',
        data: data.error,
      };
    }

    return {
      status: 'Success',
      data: data.keywords,
      message: 'Successfully generated the keywords',
    };
  } catch (error) {
    console.error('failed to fetch keywords API', error);
    return {
      status: 'Error',
      message: 'Failed to generate keywords',
      data: error,
    };
  }
};

export const getInterviewQuestions = async (
  job: Job
): Promise<Response<InterviewQs, unknown>> => {
  try {
    const jobDescription =
      job.jobSource == 'Workable'
        ? job.workableDescription.join()
        : job.description;

    const response = await fetch(`${import.meta.env.VITE_OPENAI_IQS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        job: {
          title: job.title,
          description: jobDescription,
          company: job.company,
        },
      }),
    });

    const data = await response.json();
    if (data.error || !response.ok) {
      return {
        status: 'Error',
        message: 'Failed to generate interview questions',
        data: data.error,
      };
    }
    return {
      status: 'Success',
      data: data,
      message: 'Successfully generated interview questions',
    };
  } catch (error) {
    console.error('failed to fetch interview questions API', error);
    return {
      status: 'Error',
      message: 'Failed to generate interview questions',
      data: error,
    };
  }
};

export default getKeywords;
