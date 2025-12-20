import { Deck } from "@/src/domain/models/Deck";
import { IDeckSaver } from "@/src/domain/repositories/IDeckSaver";

import { File, Paths } from "expo-file-system";


export class DeckLocalSaver implements IDeckSaver {
    private readonly fileUri: string;

    constructor() {
        this.fileUri = "decks.json";
    }
    
    public async save(data : Array<Deck>): Promise<void> {
        const file : File = new File(Paths.document, this.fileUri);
        await file.write(JSON.stringify(data), {});
    }
}