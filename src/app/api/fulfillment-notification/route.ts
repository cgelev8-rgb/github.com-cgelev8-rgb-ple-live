import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            currentStatus,
            timeline,
            additionalInterests,
            firstName,
            lastName,
            companyName,
            email,
            phone,
            preferredContact
        } = body;

        // Validation - ensure required contact fields exist
        if (!firstName || !lastName || !email || !phone) {
            return NextResponse.json(
                { message: 'Missing required contact fields' },
                { status: 400 }
            );
        }

        // Ensure SMTP credentials exist
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.error('Missing Gmail SMTP credentials');
            return NextResponse.json(
                { message: 'Server configuration error: missing email credentials' },
                { status: 500 }
            );
        }

        // Configure Nodemailer transporter for Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Email layout
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #002244;">New Fulfillment Questionnaire Lead</h2>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Preferred Contact Method(s):</strong> ${preferredContact?.length > 0 ? preferredContact.join(', ') : 'None specified'}</p>
                </div>
                
                <h3 style="color: #002244; border-bottom: 2px solid #ff6600; padding-bottom: 5px;">Questionnaire Answers:</h3>
                
                <p><strong>Current Status:</strong><br/>
                ${currentStatus}</p>
                
                <p><strong>Timeline:</strong><br/>
                ${timeline}</p>
                
                <p><strong>Additional Interests:</strong><br/>
                ${additionalInterests}</p>
            </div>
        `;

        const mailOptions = {
            from: process.env.GMAIL_USER, // Sender address
            to: process.env.GMAIL_TO || process.env.GMAIL_USER, // Receiver address (supports comma-separated list)
            replyTo: email,               // Allow replying directly to prospect
            subject: 'Fulfillment meeting booked',
            html: htmlContent,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Notification sent successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Email API Error:', error);
        return NextResponse.json(
            { message: 'Failed to send notification email', error: String(error) },
            { status: 500 }
        );
    }
}
