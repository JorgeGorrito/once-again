import { FileLoader } from "@/src/data/sources/api/github/fileLoader";
import { GitHubFile } from "@/src/data/sources/api/github/types";
import { Card } from "@/src/domain/models/Card";
import { ICardGetter } from "@/src/domain/repositories/ICardGetter";
import { ILoader } from "@/src/domain/repositories/ILoader";

export class CardGetter implements ICardGetter {
    public async get(deckId: string): Promise<Card[]> {
        const fileCardsGitHub : GitHubFile = {
            name: "decks.json",
            path: "topics/decks.json",
            sha: "",
            size: 160,
            url: `https://api.github.com/repos/JorgeGorrito/once-again/contents/topics/${deckId}.json?ref=main`,
            html_url:
                `https://github.com/JorgeGorrito/once-again/blob/main/topics/${deckId}.json`,
            git_url:
                "https://api.github.com/repos/JorgeGorrito/once-again/git/blobs/da84b1698545253708af2016c5146fec26a3110e",
            download_url:
                `https://raw.githubusercontent.com/JorgeGorrito/once-again/main/topics/${deckId}.json`,
            type: "file",
            content: "",
            encoding: "", 
        };
        
        const gitHubFileLoader : ILoader<string> = new FileLoader({
                owner: "JorgeGorrito",
                repo: "once-again",
                path: `topics`,
                branch: "main",
                fileExtensions: ["*.json"],
            },
            fileCardsGitHub
        );

        const cardsData : string = await gitHubFileLoader.load();
        const partialCards : Array<Partial<Card>> = JSON.parse(cardsData);
        const cards : Array<Card> = partialCards.map((partialCard, index) => ({
            id: partialCard.id ?? index,
            question: partialCard.question ?? "- Sin pregunta -",
            answer: partialCard.answer ?? "- Sin respuesta -",
            examples: partialCard.examples ?? [],
        }))
        
        return cards;
    }
}


