/* eslint-disable no-restricted-syntax */
import emailService from '../services/emailService';
import { userService } from '../services/userService';
import queue from '../config/bullQue';
import template from './template';

/**
 *
 * @param {*} jobData
 * @returns {*} sends an email to all subscribed users
 */
const notifyUsersOfNewJobEntry = async jobData => {
  const subject = 'NEW JOB ALERT 🚨';

  const users = await userService.findAll({ isSubscribed: true });
  const options = {
    attempts: 2,
  };

  for (const user of users) {
    const body = `<p>Dear Prospect</p>
      <p>we found a new opportunity you may be interested in and since you're are on our list we thought you should be the first to know</p>

      JOB TITLE: ${jobData.title}
      <br>
      ... rest of job info
  `;
    const message = template(subject, body, user.email);

    const data = { emailTo: user.email, subject, message };

    // Producer: adds jobs to que, in this case emails to be sent out
    queue.add(data, options);
  }
};

// Consumer: this gets called each time the producer receives a new email.
queue.process(job => {
  emailService.mailSender(job.data);
});

const Notifications = {
  notifyUsersOfNewJobEntry,
};

export default Notifications;
