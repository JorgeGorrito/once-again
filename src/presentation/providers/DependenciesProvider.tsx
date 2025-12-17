import { Dependencies } from "@/src/dependencies/types";
import React from "react";

export const DependenciesContext = React.createContext<Dependencies | null>(null);

export const DependenciesProvider: React.FC<{
  dependencies: Dependencies;
  children: React.ReactNode;
}> = ({ dependencies, children }) => (
    <DependenciesContext.Provider value={dependencies}>
        {children}
    </DependenciesContext.Provider>
);
