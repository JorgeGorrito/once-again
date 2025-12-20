import { Deck } from "@/src/domain/models/Deck";
import { ILoader } from "@/src/domain/repositories/ILoader";

export interface IDeckLoader extends ILoader<Array<Deck>> {}