import type { Deck as DeckType } from "@/src/domain/models/Deck";
import { IDeckLoader } from "@/src/domain/repositories/IDeckLoader";
import { action, observable } from "mobx";

export default class DeckInstalledStore {
    @observable.deep decks : Array<DeckType> = [];

    constructor(
        private decksLocalLoader : IDeckLoader,
    ) {
        const decksInstalledPromise = this.decksLocalLoader.load();
        decksInstalledPromise.then( (decks) => {
            this.decks = decks;
        }).catch( (error) => {
            console.error('Error loading installed decks:', error); // ToDo: manejar error adecuadamente
        })
    }

    @action add(deck : DeckType) { 
        this.decks.push(deck);
    }
}