import { Text, useThemeColor, View } from "@/src/presentation/components/Themed";
import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
    }
});

interface InstalledIconProps {
    size?: number;
}

export default function InstalledIcon({ size = 25}: InstalledIconProps) : React.JSX.Element {
    const backgroundColor = useThemeColor({}, "tertiaryColor");
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.text}>Instalado</Text>
            <MaterialIcons
                name="check-circle"
                size={size}
                color={useThemeColor({}, "primaryColor")}
            />
        </View>
    );
}