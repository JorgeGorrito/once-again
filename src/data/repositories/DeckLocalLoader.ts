import { Deck } from "@/src/domain/models/Deck";
import { IDeckLoader } from "@/src/domain/repositories/IDeckLoader";
import { File, Paths } from "expo-file-system";

export class DeckLocalLoader implements IDeckLoader {
    private readonly fileUri: string;

    constructor() {
        this.fileUri = "decks.json";
    }
   
    public async load() : Promise<Array<Deck>> {
        const file = new File(Paths.document, this.fileUri);
        if (!file.exists){ 
            return new Array<Deck>();
        }
        const content = await file.text();
        const partialDecks : Array<Partial<Deck>> = JSON.parse(content);
        const decks : Array<Deck> = partialDecks.map((partialDeck, index) => ({
            id: partialDeck.id ?? `${index}`,
            title: partialDeck.title ?? "- Sin título -",
            description: partialDeck.description ?? "- Sin descripción -",
            category: partialDeck.category ?? "General",
            cards: partialDeck.cards ?? [],
            isInstalled: partialDeck.isInstalled ?? false,
        }));
        
        return decks;
    }
}