// netlify/functions/submission-created.js
const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
    // Usamos una variable de entorno para la API Key por seguridad
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // Parseamos los datos del formulario que Netlify nos envía
    const payload = JSON.parse(event.body).payload.data;
    const buyerEmail = payload.email;
    const buyerName = payload.name;
    const plan = payload.plan;

    const msg = {
        to: buyerEmail, // Correo del comprador
        from: 'tu-email-verificado@tudominio.com', // ¡IMPORTANTE! Debe ser un email verificado en SendGrid
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
        await sgMail.send(msg);
        console.log('Correo de confirmación enviado a', buyerEmail);
        return {
            statusCode: 200,
            body: 'Correo enviado exitosamente.',
        };
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        if (error.response) {
            console.error(error.response.body);
        }
        return {
            statusCode: error.code,
            body: JSON.stringify({ msg: 'Error al enviar el correo.' }),
        };
    }
};