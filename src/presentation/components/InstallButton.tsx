import InstallIcon from "@/src/presentation/components/InstallIcon";
import { Text, useThemeColor } from "@/src/presentation/components/Themed";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,

        alignItems: "center",
        justifyContent: "space-around",
    },
    text: {
        fontSize: 18,
    }
});

interface InstallButtonProps {
    onPress?: () => void;
}

export default function InstallButton({
    onPress = () => {},
}) : React.JSX.Element {
    const backgroundColor = useThemeColor({}, "tertiaryColor");
    const textColor = useThemeColor({}, "text");
    
    const [isPressed, setIsPressed] = React.useState<boolean>(false);
    const handlePress = React.useCallback(() => {
        //setIsPressed(true);
        onPress();
    }, [onPress]);

    return (
        <TouchableOpacity disabled={isPressed} style={[styles.container, { backgroundColor }]} onPress={handlePress} >
            <Text style={[styles.text, { color: textColor }]}>Instalar</Text>
            <InstallIcon size={22} />
        </TouchableOpacity> 
    );
}