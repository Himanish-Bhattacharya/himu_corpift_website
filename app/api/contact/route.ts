import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, message, cartItems, isInquiry } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Build cart summary for inquiry emails
    let cartSection = '';
    if (isInquiry && Array.isArray(cartItems) && cartItems.length > 0) {
      const rows = cartItems
        .map(
          (item: { name: string; quantity: number; price: number }) =>
            `  • ${item.name} × ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString('en-IN')}`
        )
        .join('\n');
      const total = cartItems.reduce(
        (s: number, i: { price: number; quantity: number }) => s + i.price * i.quantity,
        0
      );
      cartSection = `\n\n─────────────────────────\nINQUIRY ITEMS\n─────────────────────────\n${rows}\n\nEstimated Total: Rs. ${total.toLocaleString('en-IN')}`;
    }

    const subject = isInquiry
      ? `New Corporate Gift Inquiry from ${company}`
      : `New Enquiry from ${company}`;

    const text = [
      `Name:    ${name}`,
      `Company: ${company}`,
      `Email:   ${email}`,
      `Phone:   ${phone}`,
      message ? `Message: ${message}` : '',
      cartSection,
    ]
      .filter(Boolean)
      .join('\n');

    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; color: #162318;">
        <div style="background: #1C3028; padding: 32px 40px; margin-bottom: 32px;">
          <h1 style="color: #3A9A87; font-size: 28px; margin: 0; letter-spacing: 0.06em;">
            CORP<span style="color: #72C4B6;">IFT</span>
          </h1>
          <p style="color: #8AAE96; font-family: system-ui, sans-serif; font-size: 13px; margin: 8px 0 0;">
            ${subject}
          </p>
        </div>

        <div style="padding: 0 40px 32px;">
          <table style="width: 100%; border-collapse: collapse; font-family: system-ui, sans-serif; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #527A60; width: 100px;">Name</td><td style="padding: 8px 0; font-weight: 500;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #527A60;">Company</td><td style="padding: 8px 0; font-weight: 500;">${company}</td></tr>
            <tr><td style="padding: 8px 0; color: #527A60;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3A9A87;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #527A60;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #3A9A87;">${phone}</a></td></tr>
            ${message ? `<tr><td style="padding: 8px 0; color: #527A60; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message}</td></tr>` : ''}
          </table>

          ${
            isInquiry && Array.isArray(cartItems) && cartItems.length > 0
              ? `
          <div style="margin-top: 32px; padding: 24px; background: #C1E1C1; border-radius: 2px;">
            <p style="font-family: system-ui, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #3A9A87; margin: 0 0 16px;">Inquiry Items</p>
            <table style="width: 100%; font-family: system-ui, sans-serif; font-size: 14px;">
              ${cartItems
                .map(
                  (item: { name: string; quantity: number; price: number }) => `
              <tr>
                <td style="padding: 6px 0; color: #162318;">${item.name} × ${item.quantity}</td>
                <td style="padding: 6px 0; text-align: right; color: #3A9A87; font-weight: 500;">Rs. ${(item.price * item.quantity).toLocaleString('en-IN')}</td>
              </tr>`
                )
                .join('')}
              <tr style="border-top: 1px solid #B5D8B8;">
                <td style="padding: 12px 0 0; font-weight: 600;">Estimated Total</td>
                <td style="padding: 12px 0 0; text-align: right; color: #3A9A87; font-weight: 700; font-size: 16px;">
                  Rs. ${cartItems.reduce((s: number, i: { price: number; quantity: number }) => s + i.price * i.quantity, 0).toLocaleString('en-IN')}
                </td>
              </tr>
            </table>
          </div>`
              : ''
          }
        </div>

        <div style="padding: 24px 40px; background: #F5FBF5; border-top: 1px solid #B5D8B8; font-family: system-ui, sans-serif; font-size: 12px; color: #8AAE96;">
          Reply directly to this email to respond to ${name}.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Corpift Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL ?? 'corpift@outlook.com',
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact route]', err);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
