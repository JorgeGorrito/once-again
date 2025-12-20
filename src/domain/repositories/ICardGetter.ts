import { Card } from "@/src/domain/models/Card";
import { IGetter } from "@/src/domain/repositories/IGetter";

export interface ICardGetter extends IGetter<Array<Card>> {}