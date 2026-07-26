import { supabase } from "@/lib/supabase/client";
import { Database, NotificationTypeEnum } from "@/lib/types";

export type NotificationRow = Database["public"]["Tables"]["notifications"]["Row"];

/**
 * Notification Subsystem Service
 * Handles notification dispatch queues, Telegram integration events, and application alerts.
 */
export async function notifyNewApplication(
  employerUserId: string,
  candidateName: string,
  jobTitle: string,
  jobId: string
): Promise<{ data: NotificationRow | null; error: Error | null }> {
  const message = `New candidate application: ${candidateName} applied for "${jobTitle}".`;
  return createSystemNotification(employerUserId, message, "application_status", jobId);
}

export async function notifyApplicationStatusChange(
  candidateUserId: string,
  jobTitle: string,
  newStatus: string,
  jobId: string
): Promise<{ data: NotificationRow | null; error: Error | null }> {
  const message = `Your application for "${jobTitle}" has been updated to: ${newStatus.replace("_", " ").toUpperCase()}.`;
  return createSystemNotification(candidateUserId, message, "application_status", jobId);
}

export async function notifySavedJobAlert(
  candidateUserId: string,
  jobTitle: string,
  jobId: string
): Promise<{ data: NotificationRow | null; error: Error | null }> {
  const message = `New opportunity matching your saved preferences: "${jobTitle}".`;
  return createSystemNotification(candidateUserId, message, "job_match", jobId);
}

async function createSystemNotification(
  userId: string,
  message: string,
  type: NotificationTypeEnum,
  jobId?: string
): Promise<{ data: NotificationRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        message,
        type,
        job_id: jobId || null,
        sent: false,
      })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}
