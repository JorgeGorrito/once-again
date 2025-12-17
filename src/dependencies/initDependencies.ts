import { CardGetter } from "@/src/data/repositories/CardGetter";
import { DeckLoader } from "@/src/data/repositories/DeckLoader";
import { Dependencies } from "@/src/dependencies/types";

export default function initDependencies(): Dependencies {
    const dependencies : Dependencies = {
        cardGetter: new CardGetter(),
        deckLoader: new DeckLoader(),
    }

    return dependencies;
}