import { Job } from 'src/@types';

const CreateJob = async (job: Partial<Job>) => {
    console.info('CreateJob', job);
    const response = await fetch(`${import.meta.env.VITE_JOB_API}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
    });
    const data = await response.json();
    console.log(data);
    return;
};

export default CreateJob;
