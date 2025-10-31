import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// Initialize Resend (will be initialized at runtime)
let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is required");
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

// Enhanced form schema with new fields
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  boilerBrand: z.string().optional(),
  boilerModel: z.string().optional(),
  problemType: z.string().optional(),
  urgency: z.enum(["emergency", "urgent", "normal", "routine"]).default("normal"),
  website: z.string().optional(), // honeypot
});

// Handle preflight OPTIONS requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate input
    const body = await request.json();
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    // Honeypot check
    if (parsed.data.website && parsed.data.website.length > 0) {
      // Bot detected. Silently succeed (do nothing else)
      return NextResponse.json(
        { 
          success: true, 
          message: "Thank you for your message. We'll get back to you shortly." 
        }, 
        { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    const { name, email, phone, message, boilerBrand, boilerModel, problemType, urgency } = parsed.data;

    // Create email content
    const subject = `New Contact Form - ${urgency === 'emergency' ? '🚨 EMERGENCY' : urgency === 'urgent' ? '⚡ URGENT' : ''} ${problemType ? problemType.replace('-', ' ') : 'Enquiry'}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a73e8; border-bottom: 2px solid #1a73e8; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: ${urgency === 'emergency' ? '#fee2e2' : urgency === 'urgent' ? '#fef3c7' : '#f3f4f6'}; 
                    padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0; color: ${urgency === 'emergency' ? '#dc2626' : urgency === 'urgent' ? '#d97706' : '#374151'};">
            Priority: ${urgency.charAt(0).toUpperCase() + urgency.slice(1)}
            ${urgency === 'emergency' ? ' 🚨' : urgency === 'urgent' ? ' ⚡' : ''}
          </h3>
        </div>

        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280; width: 30%;">Name:</td>
              <td style="padding: 8px 0; color: #374151;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Email:</td>
              <td style="padding: 8px 0; color: #374151;">
                <a href="mailto:${email}" style="color: #1a73e8;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Phone:</td>
              <td style="padding: 8px 0; color: #374151;">
                <a href="tel:${phone}" style="color: #1a73e8;">${phone}</a>
              </td>
            </tr>
          </table>
        </div>

        ${boilerBrand || boilerModel || problemType ? `
        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Boiler Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${boilerBrand ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280; width: 30%;">Brand:</td>
              <td style="padding: 8px 0; color: #374151;">${boilerBrand.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
            </tr>
            ` : ''}
            ${boilerModel ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Model:</td>
              <td style="padding: 8px 0; color: #374151;">${boilerModel}</td>
            </tr>
            ` : ''}
            ${problemType ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Problem Type:</td>
              <td style="padding: 8px 0; color: #374151;">${problemType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        ` : ''}

        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Message</h3>
          <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Submitted: ${new Date().toLocaleString('en-GB', { 
              timeZone: 'Europe/London',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    `;

    const textContent = `
New Contact Form Submission

Priority: ${urgency.toUpperCase()}${urgency === 'emergency' ? ' 🚨' : urgency === 'urgent' ? ' ⚡' : ''}

Customer Information:
Name: ${name}
Email: ${email}
Phone: ${phone}

${boilerBrand || boilerModel || problemType ? `
Boiler Information:
${boilerBrand ? `Brand: ${boilerBrand.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}` : ''}
${boilerModel ? `Model: ${boilerModel}` : ''}
${problemType ? `Problem Type: ${problemType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}` : ''}
` : ''}

Message:
${message}

Submitted: ${new Date().toLocaleString('en-GB', { 
  timeZone: 'Europe/London',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
    `;

    // Send email using Resend to both development and client emails
    const emailResult = await getResend().emails.send({
      from: 'Contact Form <noreply@birminghamboilerrepairs.uk>',
      to: ['ashley@mellingwebstudios.com', 'boilers.birmingham@yahoo.com'],
      subject: subject,
      html: htmlContent,
      text: textContent,
      replyTo: email,
    });

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
      throw new Error("Failed to send email via Resend");
    }

    // Send auto-reply to customer
    const autoReplySubject = `Thank you for contacting Birmingham Boiler Repairs`;
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a73e8;">Thank you for contacting us, ${name}!</h2>
        
        <p>We've received your ${urgency === 'emergency' ? 'emergency ' : urgency === 'urgent' ? 'urgent ' : ''}enquiry and will get back to you as soon as possible.</p>
        
        ${urgency === 'emergency' ? `
        <div style="background-color: #fee2e2; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <p style="margin: 0; color: #dc2626; font-weight: bold;">🚨 Emergency Response</p>
          <p style="margin: 10px 0 0 0; color: #374151;">We understand this is urgent. Our emergency team will contact you within the next hour.</p>
        </div>
        ` : urgency === 'urgent' ? `
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d97706;">
          <p style="margin: 0; color: #d97706; font-weight: bold;">⚡ Urgent Response</p>
          <p style="margin: 10px 0 0 0; color: #374151;">We'll prioritize your enquiry and contact you within 2-4 hours.</p>
        </div>
        ` : `
        <p>We typically respond to enquiries within 2-4 hours during business hours.</p>
        `}
        
        ${boilerBrand || problemType ? `
        <p>Based on the information you provided about your ${boilerBrand ? boilerBrand.replace('-', ' ') + ' boiler' : 'boiler'} ${problemType ? `and the ${problemType.replace('-', ' ')} issue` : ''}, we'll ensure our engineer comes prepared with the right tools and parts.</p>
        ` : ''}
        
        <p><strong>What happens next:</strong></p>
        <ul>
          <li>We'll contact you to confirm the appointment details</li>
          <li>Our qualified Gas Safe engineer will arrive at the agreed time</li>
          <li>We'll diagnose the issue and provide a clear, upfront quote</li>
          <li>All work comes with our quality guarantee</li>
        </ul>
        
        <p>If you need to reach us urgently, please call <strong>0800 320 2345</strong>.</p>
        
        <p>Best regards,<br>
        Birmingham Boiler Repairs Team</p>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; color: #6b7280; font-size: 14px;">
          <p>This is an automated response. Please do not reply to this email.</p>
        </div>
      </div>
    `;

    await getResend().emails.send({
      from: 'Birmingham Boiler Repairs <noreply@birminghamboilerrepairs.uk>',
      to: [email],
      subject: autoReplySubject,
      html: autoReplyHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you shortly.",
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error("Contact form API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}
