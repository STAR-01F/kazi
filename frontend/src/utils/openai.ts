import { config } from 'dotenv'
config()
import {OpenAI} from "openai";

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `Analyse the job description and identify 10 keywords essential for enhancing a resume/CV tailored to this position. Choose specific, relevant terms that accurately represent the core skills, qualifications, and attributes required for the job. Provide the 10 keywords as a comma-separated list in the format: 'keyword1, keyword2, keyword3...'.

Role
Who you are
We are seeking an individual with natural curiosity and an inherent drive to explore
You'll thrive in unfamiliar territories, unafraid to dive in and get hands-on
Your forte lies in envisioning the bigger picture, looking beyond immediate tasks to craft holistic solutions
A 'devops mindset' defines you, acknowledging your responsibility in not just writing code but also ensuring its smooth operation
Go
Kubernetes
Kafka
GRPC
PostgreSQL/ CockroachDB
Systems design and software architecture (high availability and fault tolerant)
DevOps experience (software engineers are expected to run the software that they build)
What the job involves
The engineering team at UW are highly-visible, consumer facing and delivery-focused. You’ll need to be prepared to work at pace and be comfortable with constant iteration, whilst working in a regulatory ecosystem
Design, build, test and deploy Go event-driven microservices on Kubernetes in the context of the Identity and Access Management platform
Contribute to the continuous improvement of our ways of working. Identify pain-points and propose improvements
Own the whole software delivery process, from ideation through to in-life support and monitoring`,
            },
            {
                role: "assistant",
                content:
                    "keyword1, keyword2, keyword3, keyword4, keyword5, keyword6, keyword7, keyword8, keyword9, keyword10",
            },
        ],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
}

export default main;
