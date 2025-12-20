import { ICardGetter } from "@/src/domain/repositories/ICardGetter";
import { ICardSaver } from "@/src/domain/repositories/ICardSaver";
import { IDeckLoader } from "@/src/domain/repositories/IDeckLoader";
import { IDeckSaver } from "@/src/domain/repositories/IDeckSaver";

export interface Dependencies { 
    decksRemoteLoader : IDeckLoader;
    cardsRemoteGetter : ICardGetter;

    decksLocalSaver : IDeckSaver;
    cardsLocalSaver : ICardSaver;

    decksLocalLoader : IDeckLoader;
}