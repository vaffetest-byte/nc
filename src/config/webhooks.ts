// Webhook Configuration
// Replace these URLs with your Zapier/Make.com webhook URLs
// These webhooks can then push data to Zoho CRM

export const WEBHOOK_CONFIG = {
  // Funding form webhook - receives plaintiff and attorney funding requests
  fundingForm: import.meta.env.VITE_FUNDING_WEBHOOK_URL || "",
  
  // Broker signup form webhook - receives broker partnership inquiries
  brokerSignup: import.meta.env.VITE_BROKER_WEBHOOK_URL || "",
};

// Helper function to send data to webhook
export async function sendToWebhook(webhookUrl: string, data: Record<string, unknown>): Promise<boolean> {
  if (!webhookUrl) {
    console.warn("Webhook URL not configured");
    return false;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors", // Required for cross-origin webhook calls
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: window.location.origin,
      }),
    });
    
    // With no-cors mode, we can't read the response, but the request is sent
    console.log("Webhook request sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending to webhook:", error);
    return false;
  }
}
