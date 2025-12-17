import { Dependencies } from "@/src/dependencies/types";
import type { Deck as DeckType } from "@/src/domain/models/Deck";
import { ICardGetter } from "@/src/domain/repositories/ICardGetter";
import InstallButton from "@/src/presentation/components/InstallButton";
import InstalledIcon from "@/src/presentation/components/InstalledIcon";
import { Text, View } from "@/src/presentation/components/Themed";
import { useDependencies } from "@/src/presentation/hooks/useDependencies";
import colors from "@/src/shared/constants/Colors";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
    },
    header: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "column",
    },
    itemHeader: {
        width: "100%",
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    titleHeader: {
        fontWeight: "bold",
        fontSize: 18,
    },
    textHeader: {
        fontSize: 18,
    },
    textBody: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
    },
    textCategory: {
        fontStyle:"italic",
        fontSize: 18,
    },
    body: {
        paddingTop: 15,
        paddingBottom: 20,
    }
});

export default function Deck({
    id,
    title,
    description,
    category,
    isInstalled,
}: DeckType): React.JSX.Element {
    const dependencies : Dependencies = useDependencies();
    const getter : ICardGetter = dependencies.cardGetter;
    const downloadCards = React.useCallback(async () => {;
        await getter.get(id);
    }, []);

    return (
        <View
            style={styles.container}
            lightColor={colors.light.tertiaryColor}
            darkColor={colors.dark.tertiaryColor}
        >
            <View
                style={styles.header}
                lightColor={colors.light.secondaryColor}
                darkColor={colors.dark.secondaryColor}
            >
                <View style={styles.itemHeader}>
                    <Text style={styles.titleHeader}>
                        {title.toUpperCase()}
                    </Text>
                    {isInstalled ? (
                        <InstalledIcon size={25} />
                    ) : (
                        <InstallButton onPress={downloadCards} />
                    )}
                </View>
                <View style={styles.itemHeader}>
                    <Text style={styles.textCategory}>Categoría </Text>
                    <Text style={styles.textCategory}>{category}</Text>
                </View>
            </View>
            <View 
                lightColor={colors.light.tertiaryColor}
                darkColor={colors.dark.tertiaryColor} 
                style={styles.body}
            >
                <Text style={styles.textBody}>{description}</Text>
            </View>
        </View>
    );
};