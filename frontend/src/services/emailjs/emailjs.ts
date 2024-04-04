import Feedback from 'src/@types/feedback';
import emailjs from '@emailjs/browser';

const sendEmail = (feedback: Feedback) => {
  const message = JSON.stringify(feedback, null, 2);
  emailjs
    .send(
      'service_4cxcyje',
      'template_o1vuh2e',
      {
        to_email: 'kazi.stars.dev@gmail.com',
        message,
      },
      'xvK7xUvdDjnRQJ35_'
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
};

export default sendEmail;
