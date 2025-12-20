import { Dependencies } from "@/src/dependencies/types";
import type { Deck as DeckType } from "@/src/domain/models/Deck";
import { IDeckLoader } from "@/src/domain/repositories/IDeckLoader";
import Deck from "@/src/presentation/components/Deck";
import { useThemeColor } from "@/src/presentation/components/Themed";
import { useDeckStore } from "@/src/presentation/hooks/useDeckStore";
import { useDependencies } from "@/src/presentation/hooks/useDependencies";
import { DeckStore } from "@/src/presentation/providers/DeckStoreProvider";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    list: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    emptyText: {
        color: "#666",
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default function Decks() {
    const dependencies : Dependencies = useDependencies();
    const [decks, setDecks] = React.useState<Array<DeckType>>([]);
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const deckStore : DeckStore = useDeckStore();
    
    const decksRemoteLoader: IDeckLoader = dependencies.decksRemoteLoader;
    const loadingColor = useThemeColor({}, 'text');

    const loadDecks = async () : Promise<void>=> {
        try {
            const remoteDecks = await decksRemoteLoader.load();
            const remoteDecksFiltered = remoteDecks.filter( remoteDeck => 
                !deckStore.installed.decks.some( localDeck => localDeck.id === remoteDeck.id )
            );
            setDecks(remoteDecksFiltered.concat(deckStore.installed.decks));
        } catch (error) {
            console.error('Error loading decks:', error); // ToDo: manejar error adecuadamente
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = async () : Promise<void>=> {
        loadDecks();
    };

    const updateDeck = (id : string, updateData : Partial<DeckType>) => {
        setDecks( prevDecks => prevDecks.map(deck => deck.id === id ? { ...deck, ...updateData } : deck) );
    };

    React.useEffect(() => {
        // const l = new DeckLocalSaver();
        // const f = async () => {await l.save([]);}
        // f();
        loadDecks();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={loadingColor} />
                <Text style={styles.emptyText}>Cargando mazos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={decks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Deck updateDeck={updateDeck} {...item} />}
                contentContainerStyle={decks.length === 0 ? { flexGrow: 1 } : {}}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            No hay mazos disponibles
                        </Text>
                        <Text style={[styles.emptyText, { fontSize: 14 }]}>
                            Crea tu primer mazo para comenzar
                        </Text>
                    </View>
                }
                refreshing={refreshing}
                onRefresh={handleRefresh}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={10}
                removeClippedSubviews={true}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
        </View>
    );
}