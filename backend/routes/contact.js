import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email and message are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // ── Email to owner ──
    await transporter.sendMail({
      from: `"Raja Snacks Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject: `📬 New Enquiry: ${subject || 'General'} — ${name}`,
      html: `
        <div style="font-family:'DM Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#BF4E0C,#E8621A,#F97C35);padding:32px 36px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
              <span style="font-size:28px;">🥜</span>
              <span style="font-family:Georgia,serif;font-size:22px;font-weight:800;color:#fff;letter-spacing:0.04em;">Raja Snacks</span>
            </div>
            <h2 style="color:#fff;margin:0;font-size:20px;font-weight:600;opacity:0.9;">New Contact Form Submission</h2>
          </div>

          <!-- Body -->
          <div style="padding:32px 36px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F0E4D8;width:130px;">
                  <span style="font-size:12px;font-weight:700;color:#9A8070;text-transform:uppercase;letter-spacing:0.06em;">Name</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #F0E4D8;">
                  <span style="font-size:15px;font-weight:600;color:#1A0A00;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F0E4D8;">
                  <span style="font-size:12px;font-weight:700;color:#9A8070;text-transform:uppercase;letter-spacing:0.06em;">Email</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #F0E4D8;">
                  <a href="mailto:${email}" style="color:#E8621A;font-size:15px;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F0E4D8;">
                  <span style="font-size:12px;font-weight:700;color:#9A8070;text-transform:uppercase;letter-spacing:0.06em;">Phone</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #F0E4D8;">
                  <a href="tel:${phone}" style="color:#E8621A;font-size:15px;">${phone}</a>
                </td>
              </tr>` : ''}
              ${subject ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F0E4D8;">
                  <span style="font-size:12px;font-weight:700;color:#9A8070;text-transform:uppercase;letter-spacing:0.06em;">Subject</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #F0E4D8;">
                  <span style="font-size:15px;color:#1A0A00;">${subject}</span>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding:10px 0;vertical-align:top;">
                  <span style="font-size:12px;font-weight:700;color:#9A8070;text-transform:uppercase;letter-spacing:0.06em;">Message</span>
                </td>
                <td style="padding:10px 0;">
                  <div style="background:#FFF8F0;border-left:3px solid #E8621A;padding:14px 16px;border-radius:0 8px 8px 0;font-size:15px;color:#4A3728;line-height:1.7;">
                    ${message.replace(/\n/g, '<br/>')}
                  </div>
                </td>
              </tr>
            </table>

            <div style="margin-top:28px;padding:16px 20px;background:#FFF0E6;border-radius:12px;display:flex;align-items:center;gap:10px;">
              <span style="font-size:18px;">💡</span>
              <span style="font-size:13px;color:#7A6358;">Hit <strong>Reply</strong> to respond directly to ${name} at ${email}</span>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#F5F0EB;padding:18px 36px;text-align:center;font-size:12px;color:#C8B8A8;">
            © ${new Date().getFullYear()} Raja Snacks • Tiruppur, Tamil Nadu
          </div>
        </div>
      `,
    });

    // ── Auto-reply to sender ──
    await transporter.sendMail({
      from: `"Raja Snacks" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `✅ We received your message, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family:'DM Sans',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg,#BF4E0C,#E8621A,#F97C35);padding:32px 36px;text-align:center;">
            <div style="font-size:40px;margin-bottom:10px;">🥜</div>
            <h1 style="font-family:Georgia,serif;color:#fff;margin:0;font-size:26px;">Raja Snacks</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">Wholesale Snacks Supplier, Tiruppur</p>
          </div>
          <div style="padding:36px;">
            <h2 style="font-family:Georgia,serif;color:#1A0A00;margin:0 0 16px;font-size:22px;">Thanks for reaching out, ${name.split(' ')[0]}! 👋</h2>
            <p style="color:#7A6358;font-size:15px;line-height:1.7;margin:0 0 16px;">
              We've received your message and our team will get back to you within <strong>24 hours</strong>.
            </p>
            <div style="background:#FFF8F0;border-radius:12px;padding:18px 20px;margin:20px 0;border-left:3px solid #E8621A;">
              <p style="font-size:12px;font-weight:700;color:#9A8070;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 8px;">Your message</p>
              <p style="font-size:14px;color:#4A3728;line-height:1.6;margin:0;">${message.replace(/\n/g, '<br/>')}</p>
            </div>
            <p style="color:#7A6358;font-size:14px;line-height:1.7;margin:0 0 24px;">
              In the meantime, feel free to call us directly:<br/>
              <a href="tel:+919842263860" style="color:#E8621A;font-weight:700;">+91 98422 63860</a> &nbsp;|&nbsp;
              <a href="https://wa.me/919842263860" style="color:#25D366;font-weight:700;">WhatsApp</a>
            </p>
            <a href="http://localhost:5173/products" style="display:inline-block;background:linear-gradient(135deg,#F97C35,#C14E0E);color:#fff;border-radius:50px;padding:12px 28px;font-size:14px;font-weight:700;text-decoration:none;box-shadow:0 4px 16px rgba(232,98,26,0.35);">
              Browse Our Products →
            </a>
          </div>
          <div style="background:#F5F0EB;padding:16px 36px;text-align:center;font-size:12px;color:#C8B8A8;">
            © ${new Date().getFullYear()} Raja Snacks • KSC School Road, Tiruppur, Tamil Nadu 641604
          </div>
        </div>
      `,
    });

    res.json({ success: true, message: 'Email sent successfully.' });

  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
});

export default router;