import { Card } from "@/src/domain/models/Card";
import { IIdentifiedSaver } from "@/src/domain/repositories/ISaver";

import { File, Paths } from "expo-file-system";

export class CardLocalSaver implements IIdentifiedSaver<Array<Card>> {
    public async save(id : string, data: Array<Card>): Promise<void> {
        const fileUri = `${id}.json`;
        const file = new File(Paths.document, fileUri);
        await file.write(JSON.stringify(data), {});
    }
}