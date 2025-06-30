// netlify/functions/submission-created.js
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
// Necesitamos la API Key Y el dominio
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
});
const mailgunDomain = process.env.MAILGUN_DOMAIN;

exports.handler = async (event) => {
    const payload = JSON.parse(event.body).payload.data;
    const buyerEmail = payload.email;
    const buyerName = payload.name;
    const plan = payload.plan;

    const msg = {
        from: `El equipo de StockTracker <mail@${mailgunDomain}>`, // Remitente
        to: [buyerEmail], // Correo del comprador
        subject: `Confirmación de tu interés en StockTracker - Plan ${plan}`,
        html: `
            <div style="font-family: sans-serif; line-height: 1.6;">
                <h2>¡Gracias por tu interés, ${buyerName}!</h2>
                <p>Hemos recibido tu información para el <strong>Plan ${plan}</strong> de StockTracker.</p>
                <p>Si completaste el pago, lo verificaremos pronto. Si solicitaste una cotización, nos pondremos en contacto contigo a la brevedad.</p>
                <p>¡Estamos emocionados de ayudarte a tomar el control de tu inventario!</p>
                <br>
                <p>Saludos,<br>El equipo de StockTracker</p>
            </div>
        `,
    };

    try {
        await mg.messages.create(mailgunDomain, msg);
        console.log('Correo de confirmación enviado vía Mailgun a', buyerEmail);
        return {
            statusCode: 200,
            body: 'Correo enviado exitosamente.',
        };
    } catch (error) {
        console.error('Error al enviar el correo con Mailgun:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: 'Error al enviar el correo.' }),
        };
    }
};