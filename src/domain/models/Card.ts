interface ExampleCard {
    description: string;
    explanation?: string;
};

export interface Card {
    id: number;
    question: string;
    answer: string;
    examples?: Array<ExampleCard>;
};