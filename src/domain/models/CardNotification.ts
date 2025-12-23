import type { Card } from "@/src/domain/models/Card";
import type { Notification } from "@/src/domain/models/Notification";

export interface CardNotification extends Notification<Card> {}