export type ContactStatus = "idle" | "submitting" | "success" | "error";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface ContactInfo {
  eyebrow: string;
  title: string;
  hubTitle: string;
  hubDescription: string;
  email: string;
}
