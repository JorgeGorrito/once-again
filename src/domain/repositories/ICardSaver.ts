import { Card } from "@/src/domain/models/Card";
import { IIdentifiedSaver } from "@/src/domain/repositories/ISaver";

export interface ICardSaver extends IIdentifiedSaver<Array<Card>> {}