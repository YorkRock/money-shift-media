

import nodemailer from 'nodemailer';

// メール送信設定
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// メール送信関数
export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
}) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'shift@money-shift.jp',
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// ニュースレター送信用のHTMLテンプレート
export const createNewsletterTemplate = (articles: any[], unsubscribeUrl: string) => {
  return `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SHIFT ニュースレター</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #027EBE; color: white; padding: 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 20px 0; }
        .article { margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .article h2 { color: #027EBE; margin-bottom: 10px; }
        .article p { margin-bottom: 10px; }
        .article a { color: #027EBE; text-decoration: none; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .footer a { color: #027EBE; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>SHIFT ニュースレター</h1>
          <p>ビジネス、テクノロジー、マネー、ライフの最新情報</p>
        </div>
        
        <div class="content">
          <h2>今週の注目記事</h2>
          ${articles.map(article => `
            <div class="article">
              <h2><a href="https://money-shift.jp/articles/${article.slug}">${article.title}</a></h2>
              <p>${article.excerpt || article.content.substring(0, 200)}...</p>
              <p><strong>カテゴリ:</strong> ${article.category}</p>
              <p><a href="https://money-shift.jp/articles/${article.slug}">続きを読む →</a></p>
            </div>
          `).join('')}
        </div>
        
        <div class="footer">
          <p>このメールは SHIFT (msmedia32's projects) からお送りしています。</p>
          <p><a href="${unsubscribeUrl}">配信停止</a> | <a href="https://money-shift.jp">ウェブサイト</a></p>
          <p>お問い合わせ: shift@money-shift.jp</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// テストメール送信
export const sendTestEmail = async (to: string) => {
  const html = `
    <h1>SHIFT テストメール</h1>
    <p>メール送信設定が正常に動作しています。</p>
    <p>送信日時: ${new Date().toLocaleString('ja-JP')}</p>
    <p>送信元: shift@money-shift.jp</p>
    <p>運営: msmedia32's projects</p>
  `;

  return await sendEmail({
    to,
    subject: 'SHIFT - メール送信テスト',
    html,
    text: 'SHIFT テストメール - メール送信設定が正常に動作しています。',
  });
};

