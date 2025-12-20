import { DeckStore, DeckStoreContext } from "@/src/presentation/providers/DeckStoreProvider";
import { useContext } from "react";

export const useDeckStore = ()  : DeckStore => {
    const context = useContext(DeckStoreContext);
    if (!context) {
        throw new Error("useStoreContext must be used within a StoreProvider");
    }
    return context;
};