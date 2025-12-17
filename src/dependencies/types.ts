import { ICardGetter } from "@/src/domain/repositories/ICardGetter";
import { IDeckLoader } from "@/src/domain/repositories/IDeckLoader";

export interface Dependencies { 
    deckLoader : IDeckLoader;
    cardGetter : ICardGetter;
}