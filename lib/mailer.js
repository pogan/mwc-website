/**
 * Konfiguracja transportu e-mail (Nodemailer) na podstawie zmiennych środowiskowych.
 */

const nodemailer = require('nodemailer');

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined
    });
  }
  return transporter;
}

/**
 * Wysyła wiadomość ze zgłoszeniem z formularza kontaktowego na adres CONTACT_TO_EMAIL.
 */
async function sendContactEmail({ name, email, phone, eventType, message }) {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;

  if (!to) {
    throw new Error('Brak CONTACT_TO_EMAIL w konfiguracji środowiska.');
  }

  await getTransporter().sendMail({
    to,
    from,
    replyTo: email,
    subject: `Nowa wiadomość ze strony – ${name}`,
    text: [
      `Imię: ${name}`,
      `E-mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      eventType ? `Rodzaj ceremonii: ${eventType}` : null,
      '',
      message
    ]
      .filter(Boolean)
      .join('\n')
  });
}

module.exports = { sendContactEmail };
