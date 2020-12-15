import nodemailer from 'nodemailer';

/**
 * This is a config file for nodemailer
 *
 * @type {string}
 */

const from = '"Mome" <noreply@mome.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

/**
 * Send an email after successful signup
 *
 * @param user
 */

export function sendConfirmationEmail(user) {
  const transport = setup();

  const data = JSON.stringify(user);

  const email = {
    from,
    to: JSON.parse(data).email,
    subject: 'Welcome to Mome',
    text: `
        Welcome to Mome.
        `
  };

  transport.sendMail(email);
}

