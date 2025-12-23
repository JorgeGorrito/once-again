import { CardGetter } from "@/src/data/repositories/CardGetter";
import { CardLocalSaver } from "@/src/data/repositories/CardLocalSaver";
import { DeckLoader } from "@/src/data/repositories/DeckLoader";
import { DeckLocalLoader } from "@/src/data/repositories/DeckLocalLoader";
import { DeckLocalSaver } from "@/src/data/repositories/DeckLocalSaver";
import { LocalCardNotifierService } from "@/src/data/services/LocalCardNotifierService";
import { Dependencies } from "@/src/dependencies/types";

export default function initDependencies(): Dependencies {
    const dependencies : Dependencies = {
        cardsRemoteGetter: new CardGetter(),
        cardsLocalSaver: new CardLocalSaver(),

        decksRemoteLoader: new DeckLoader(),
        decksLocalSaver: new DeckLocalSaver(),

        decksLocalLoader: new DeckLocalLoader(),
        localCardNotifier: new LocalCardNotifierService(),
    }

    return dependencies;
}