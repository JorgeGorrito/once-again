import { Dependencies, DependenciesContext } from "@/src/presentation/providers/DependenciesProvider";
import React from "react";

export const useDependencies = () : Dependencies => {
    const dependencies = React.useContext(DependenciesContext);
    if (!dependencies) 
        throw new Error("useDependencies must be used within a DependenciesProvider");

    return dependencies;
}

