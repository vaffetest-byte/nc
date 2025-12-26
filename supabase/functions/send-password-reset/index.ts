import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
  siteUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, siteUrl }: PasswordResetRequest = await req.json();
    
    console.log("Password reset requested for:", email);
    console.log("Site URL:", siteUrl);

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check if the email exists in admin_users table
    const { data: adminUser, error: adminError } = await supabaseAdmin
      .from("admin_users")
      .select("email")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (adminError) {
      console.error("Error checking admin user:", adminError);
      throw new Error("Failed to verify email");
    }

    if (!adminUser) {
      // Don't reveal if email exists or not for security
      console.log("Email not found in admin_users, returning success anyway");
      return new Response(
        JSON.stringify({ success: true, message: "If an account exists, a reset email will be sent" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate a secure random token
    const token = crypto.randomUUID() + "-" + crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    // Store the token in the database
    const { error: tokenError } = await supabaseAdmin
      .from("password_reset_tokens")
      .insert({
        email: email.toLowerCase().trim(),
        token: token,
        expires_at: expiresAt.toISOString(),
      });

    if (tokenError) {
      console.error("Error storing reset token:", tokenError);
      throw new Error("Failed to create reset token");
    }

    // Build the reset link
    const resetLink = `${siteUrl}/admin/login?reset_token=${token}`;
    console.log("Reset link generated");

    // Get SMTP password from secrets
    const smtpPassword = Deno.env.get("GODADDY_SMTP_PASSWORD");
    if (!smtpPassword) {
      console.error("GODADDY_SMTP_PASSWORD not configured");
      throw new Error("Email service not configured");
    }

    // Initialize SMTP client for GoDaddy
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

    // Send the password reset email
    await client.send({
      from: "NCA Claim <noreply@ncaclaim.com>",
      to: email,
      subject: "Reset Your NCA Claim Admin Password",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">NCA Claim</h1>
          </div>
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1a365d; margin-top: 0;">Password Reset Request</h2>
            <p>Hello,</p>
            <p>We received a request to reset the password for your NCA Claim admin account. Click the button below to set a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background: #c9a227; color: #1a365d; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            <p style="color: #718096; font-size: 14px;">This link will expire in 1 hour for security reasons.</p>
            <p style="color: #718096; font-size: 14px;">If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
            <p style="color: #a0aec0; font-size: 12px; text-align: center;">
              &copy; ${new Date().getFullYear()} NCA Claim. All rights reserved.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    await client.close();
    console.log("Password reset email sent successfully to:", email);

    return new Response(
      JSON.stringify({ success: true, message: "Password reset email sent" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in send-password-reset function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
