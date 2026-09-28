export type ContactStatus = "idle" | "submitting" | "success";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactInfo {
  eyebrow: string;
  title: string;
  hubTitle: string;
  hubDescription: string;
  email: string;
}
