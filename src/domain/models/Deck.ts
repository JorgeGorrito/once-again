import { Card } from "@/src/domain/models/Card";

export interface Deck {
    id: string;
    title: string;
    description: string;
    category: string;
    cards: Array<Card>;
    isInstalled: boolean;
}