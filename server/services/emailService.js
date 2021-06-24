/* eslint-disable no-console */
import nodemailer from 'nodemailer';

const mailSender = async mailData => {
  try {
    const account = await nodemailer.createTestAccount();

    const transporter = await nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: account.user, pass: account.pass },
    });

    const data = {
      from: 'no-reply@taikai.com',
      to: mailData.emailTo,
      subject: mailData.subject,
      html: mailData.message,
    };

    const info = await transporter.sendMail(data);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error, 'Mail Error');
  }
};

export default { mailSender };
