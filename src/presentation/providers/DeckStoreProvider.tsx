import DeckInstalledStore from "@/src/presentation/stores/DeckInstalledStore";
import React from "react";

export interface DeckStore {
    installed : DeckInstalledStore
};

export const DeckStoreContext = React.createContext<DeckStore | null>(null);

export const DeckStoreContextProvider : React.FC<{
    stores : DeckStore,
    children : React.ReactNode
}> = ({ stores, children }) => (
    <DeckStoreContext.Provider value={stores}>
        {children}
    </DeckStoreContext.Provider>
);

