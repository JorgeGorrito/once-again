import { useThemeColor } from "@/src/presentation/components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

interface InstallIconProps {
    size?: number;
}

export default function InstallIcon({
    size = 25,
}: InstallIconProps): React.JSX.Element {
    const iconColor = useThemeColor({}, "primaryColor");
    return (
        <MaterialIcons
            name="file-download"
            size={size}
            color={iconColor}
        />
    );
}
