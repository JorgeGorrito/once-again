import { FileLoader } from "@/src/data/sources/api/github/fileLoader";
import { GitHubFile } from "@/src/data/sources/api/github/types";
import { Deck } from "@/src/domain/models/Deck";
import { ILoader } from "@/src/domain/repositories/ILoader";

export class DeckLoader implements ILoader<Array<Deck>> {
    private gitHubFileLoader : ILoader<string>;

    constructor () {
        const fileDeckGitHub : GitHubFile = {
            name: "decks.json",
            path: "topics/decks.json",
            sha: "",
            size: 160,
            url: "https://api.github.com/repos/JorgeGorrito/once-again/contents/topics/decks.json?ref=main",
            html_url:
                "https://github.com/JorgeGorrito/once-again/blob/main/topics/decks.json",
            git_url:
                "https://api.github.com/repos/JorgeGorrito/once-again/git/blobs/da84b1698545253708af2016c5146fec26a3110e",
            download_url:
                "https://raw.githubusercontent.com/JorgeGorrito/once-again/main/topics/decks.json",
            type: "file",
            content: "",
            encoding: "", 
        };

        this. gitHubFileLoader = new FileLoader({
                owner: "JorgeGorrito",
                repo: "once-again",
                path: "topics",
                branch: "main",
                fileExtensions: ["*.json"],
            },
            fileDeckGitHub
        );
    }

    public async load() : Promise<Array<Deck>> {
        const decksData : string = await this.gitHubFileLoader.load();
        const partialDecks : Array<Partial<Deck>> = JSON.parse(decksData);
        const decks: Array<Deck> = partialDecks.map((partialDeck, index) => ({
            id: partialDeck.id ?? "deck-" + index,
            title: partialDeck.title ?? "Untitled Deck",
            description: partialDeck.description ?? "",
            category: partialDeck.category ?? "Uncategorized",
            cards: partialDeck.cards ?? [],
            isInstalled: partialDeck.isInstalled ?? false,
        }));
        return decks;
    }
}


