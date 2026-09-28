import { ContactApiResponse, ContactFormData } from "../types";

/**
 * Dispatches a contact form transmission to the backend API route.
 * Handles network failures and parses structured responses.
 */
export async function sendContactMessage(
  data: ContactFormData
): Promise<ContactApiResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: ContactApiResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to transmit message.",
        error: result.error || `HTTP error ${response.status}`,
      };
    }

    return result;
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Network error occurred.";
    return {
      success: false,
      message: "Communication streams disconnected. Please try again or reach out directly.",
      error: errorMessage,
    };
  }
}
