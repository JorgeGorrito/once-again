import { Deck } from "@/src/domain/models/Deck";
import { ISingletonSaver } from "@/src/domain/repositories/ISaver";

export interface IDeckSaver extends ISingletonSaver<Array<Deck>> {}