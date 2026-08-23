/**
 * Walidacja i przetwarzanie formularza kontaktowego (strona /kontakt).
 */

const { sendContactEmail } = require('./mailer');

function validate({ name, email, message }) {
  const errors = [];

  if (name.length < 2) errors.push('Podaj imię (min. 2 znaki).');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Podaj poprawny adres e-mail.');
  if (message.length < 10) errors.push('Napisz kilka słów o swojej ceremonii (min. 10 znaków).');

  return errors;
}

/**
 * Waliduje dane z formularza i – jeśli poprawne – wysyła zgłoszenie e-mailem.
 * Zwraca stan formularza do wyrenderowania w widoku (wartości, błędy, sukces).
 */
async function processContactForm(body = {}) {
  const { name = '', email = '', phone = '', eventType = '', message = '' } = body;

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanPhone = phone.trim();
  const cleanEventType = eventType.trim();
  const cleanMessage = message.trim();

  const errors = validate({ name: cleanName, email: cleanEmail, message: cleanMessage });

  const formState = {
    values: { name: cleanName, email: cleanEmail, phone: cleanPhone, eventType: cleanEventType, message: cleanMessage },
    errors,
    success: false
  };

  if (errors.length === 0) {
    try {
      await sendContactEmail({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        eventType: cleanEventType,
        message: cleanMessage
      });
      formState.success = true;
      formState.values = { name: '', email: '', phone: '', eventType: '', message: '' };
      console.log(`Wiadomość z formularza kontaktowego wysłana pomyślnie (od: ${cleanName} <${cleanEmail}>).`);
    } catch (err) {
      console.error(`Błąd wysyłki formularza kontaktowego (od: ${cleanName} <${cleanEmail}>):`, err);
      formState.errors.push(
        'Nie udało się wysłać wiadomości. Spróbuj ponownie później lub skontaktuj się telefonicznie.'
      );
    }
  }

  return formState;
}

module.exports = { processContactForm };
