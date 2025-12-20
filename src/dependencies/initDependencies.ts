import { CardGetter } from "@/src/data/repositories/CardGetter";
import { DeckLoader } from "@/src/data/repositories/DeckLoader";
import { Dependencies } from "@/src/dependencies/types";
import { CardLocalSaver } from "../data/repositories/CardLocalSaver";
import { DeckLocalLoader } from "../data/repositories/DeckLocalLoader";
import { DeckLocalSaver } from "../data/repositories/DeckLocalSaver";

export default function initDependencies(): Dependencies {
    const dependencies : Dependencies = {
        cardsRemoteGetter: new CardGetter(),
        cardsLocalSaver: new CardLocalSaver(),

        decksRemoteLoader: new DeckLoader(),
        decksLocalSaver: new DeckLocalSaver(),

        decksLocalLoader: new DeckLocalLoader(),
    }

    return dependencies;
}