import { CardNotification } from "@/src/domain/models/CardNotification";
import { INotifier } from "@/src/domain/repositories/INotifier";

export interface ILocalCardNotifier extends INotifier<CardNotification> {}