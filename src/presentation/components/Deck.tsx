import { Dependencies } from "@/src/dependencies/types";
import { Card } from "@/src/domain/models/Card";
import type { Deck as DeckType } from "@/src/domain/models/Deck";
import { ICardGetter } from "@/src/domain/repositories/ICardGetter";
import { ICardSaver } from "@/src/domain/repositories/ICardSaver";
import { IDeckSaver } from "@/src/domain/repositories/IDeckSaver";
import InstallButton from "@/src/presentation/components/InstallButton";
import InstalledIcon from "@/src/presentation/components/InstalledIcon";
import { Text, View } from "@/src/presentation/components/Themed";
import { useDeckStore } from "@/src/presentation/hooks/useDeckStore";
import { useDependencies } from "@/src/presentation/hooks/useDependencies";
import { DeckStore } from "@/src/presentation/providers/DeckStoreProvider";
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
        justifyContent: "space-around",
    },
    titleHeader: {
        fontWeight: "bold",
        fontSize: 16,
        maxWidth: "65%",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingRight: 10,
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
    },
    itemBody: {
        backgroundColor: "transparent",
    }
});

interface DeckProps extends DeckType {
    updateDeck : (id : string, updateData : Partial<DeckType>) => void;
}

export default function Deck(deck : DeckProps): React.JSX.Element {
    const dependencies : Dependencies = useDependencies();
    const deckStore : DeckStore = useDeckStore();
    const cardsRemoteGetter : ICardGetter = dependencies.cardsRemoteGetter;
    const cardsLocalSaver : ICardSaver = dependencies.cardsLocalSaver;
    const decksLocalSaver : IDeckSaver = dependencies.decksLocalSaver;

    const downloadCards = React.useCallback(async () => {
        const remoteCards : Array<Card> = await cardsRemoteGetter.get(deck.id);
        await cardsLocalSaver.save(deck.id, remoteCards);

        deckStore.installed.add({ ...deck, isInstalled: true });
        await decksLocalSaver.save(deckStore.installed.decks);
        deck.updateDeck(deck.id, { isInstalled: true });
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
                        {deck.title.toUpperCase()}
                    </Text>
                    {deck.isInstalled ? (
                        <InstalledIcon size={25} />
                    ) : (
                        <InstallButton onPress={downloadCards} />
                    )}
                </View>
                <View style={styles.itemHeader}>
                    <Text style={styles.textCategory}>Categoría </Text>
                    <Text style={styles.textCategory}>{deck.category}</Text>
                </View>
            </View>
            <View 
                lightColor={colors.light.tertiaryColor}
                darkColor={colors.dark.tertiaryColor} 
                style={styles.body}
            >
                <View style={styles.itemBody}>
                    <Text style={styles.textBody}>{deck.description}</Text>
                </View>
            </View>
        </View>
    );
};