import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
  resetLink: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, resetLink }: PasswordResetRequest = await req.json();
    
    console.log("Sending password reset email to:", email);
    console.log("Reset link:", resetLink);

    const smtpPassword = Deno.env.get("GODADDY_SMTP_PASSWORD");
    if (!smtpPassword) {
      throw new Error("SMTP password not configured");
    }

    const client = new SMTPClient({
      connection: {
        hostname: "smtpout.secureserver.net",
        port: 465,
        tls: true,
        auth: {
          username: "noreply@ncaclaim.com",
          password: smtpPassword,
        },
      },
    });

    await client.send({
      from: "NCA Claim <noreply@ncaclaim.com>",
      to: email,
      subject: "Reset Your Password - NCA Claim",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #c9a961; margin: 0; font-size: 28px;">NCA Claim</h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1a365d; margin-top: 0;">Password Reset Request</h2>
            
            <p>We received a request to reset your password for your NCA Claim admin account.</p>
            
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background: #c9a961; color: #1a365d; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            
            <p style="font-size: 14px; color: #666;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="font-size: 12px; color: #888; word-break: break-all;">${resetLink}</p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #888;">If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.</p>
            
            <p style="font-size: 12px; color: #888;">This link will expire in 1 hour.</p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} NCA Claim. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    });

    await client.close();
    
    console.log("Password reset email sent successfully to:", email);

    return new Response(
      JSON.stringify({ success: true, message: "Password reset email sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending password reset email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
