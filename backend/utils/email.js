const nodemailer = require('nodemailer');

// Set up the transporter using SMTP or a service like Gmail, SendGrid, etc.
// For now, it will use environment variables, but can fallback to a dummy/test transport if not configured
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendConfirmationEmail = async (contact) => {
  try {
    const { email, full_name, wants_free_session } = contact;
    
    let htmlContent = `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>شكراً لتواصلك معنا في SMART!</h2>
        <p>مرحباً ${full_name}،</p>
        <p>لقد تلقينا رسالتك بنجاح. سيقوم فريقنا بمراجعتها والرد عليك في غضون 24-48 ساعة.</p>
    `;

    if (wants_free_session) {
      htmlContent += `
        <div style="background-color: #f8fafc; border-right: 4px solid #3B82F6; padding: 16px; margin: 20px 0;">
          <h3 style="color: #3B82F6; margin-top: 0;">طلب جلسة التوجيه المجانية</h3>
          <p>لقد لاحظنا طلبك للحصول على جلسة التوجيه المجانية الخاصة بأصحاب كتاب SMART. سنتواصل معك قريباً لتحديد موعد الجلسة المناسب.</p>
        </div>
      `;
    }

    htmlContent += `
        <p>مع خالص التحيات،<br>فريق بروتوكول SMART</p>
      </div>
    `;

    // Only attempt to send if SMTP_USER is configured, otherwise just log it
    if (process.env.SMTP_USER) {
      await transporter.sendMail({
        from: '"SMART Protocol" <noreply@smartprotocol.com>', // Replace with your verified sender
        to: email,
        subject: 'تم استلام رسالتك - SMART Protocol',
        html: htmlContent,
      });
      console.log(`Confirmation email sent to ${email}`);
    } else {
      console.log(`SMTP not configured. Would have sent confirmation email to ${email}`);
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};
