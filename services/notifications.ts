import { supabase } from "@/lib/supabase/client";
import { Database, NotificationTypeEnum } from "@/lib/types";

export type NotificationRow = Database["public"]["Tables"]["notifications"]["Row"];
export type TelegramConnectionRow = Database["public"]["Tables"]["telegram_connections"]["Row"];

/**
 * Data Access Service: Telegram Connections & Alerts
 */
export async function getUserNotifications(
  userId: string
): Promise<NotificationRow[]> {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function createNotification(
  userId: string,
  message: string,
  type: NotificationTypeEnum = "job_match",
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

export async function getTelegramConnection(
  userId: string
): Promise<TelegramConnectionRow | null> {
  try {
    const { data, error } = await supabase
      .from("telegram_connections")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function linkTelegramAccount(
  userId: string,
  telegramId: string,
  username?: string
): Promise<{ data: TelegramConnectionRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("telegram_connections")
      .upsert({
        user_id: userId,
        telegram_id: telegramId,
        username: username || null,
        connected: true,
      })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}
