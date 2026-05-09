import nodemailer from "nodemailer";

// 1. Configura o "carteiro" (transporter) com os dados do Mailtrap
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "2525"),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 2. Cria a função que será chamada no seu Controller
export async function enviarEmailVerificacao(
  emailDestino: string,
  linkValidacao: string,
) {
  try {
    // A função sendMail monta e dispara a mensagem
    await transporter.sendMail({
      from: '"Biblioteca Central" <nao-responda@biblioteca.com>', // Quem está enviando
      to: emailDestino, // Para quem vai
      subject: "Confirme seu E-mail - Biblioteca Central", // Assunto

      // Versão em texto puro (para clientes de e-mail mais simples)
      text: `Olá! Obrigado por se cadastrar. Clique no link para verificar sua conta: ${linkValidacao}`,

      // Versão HTML bonita (com botões e formatação)
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">Bem-vindo à Biblioteca Central! 📚</h2>
          <p style="color: #555; line-height: 1.5;">
            Falta pouco para você poder fazer seus empréstimos. Por favor, clique no botão abaixo para confirmar seu e-mail e ativar sua conta:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${linkValidacao}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Verificar meu E-mail
            </a>
          </div>
          <p style="color: #777; font-size: 12px; border-top: 1px solid #eee; padding-top: 15px;">
            Se o botão não funcionar, copie e cole este link no seu navegador:<br>
            <a href="${linkValidacao}" style="color: #4CAF50;">${linkValidacao}</a>
          </p>
        </div>
      `,
    });

    console.log(
      `✉️ E-mail de verificação enviado com sucesso para: ${emailDestino}`,
    );
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail de verificação:", error);
  }
}
