import { Dependencies } from "@/src/dependencies/types";
import type { Deck as DeckType } from "@/src/domain/models/Deck";
import { IDeckLoader } from "@/src/domain/repositories/IDeckLoader";
import Deck from "@/src/presentation/components/Deck";
import { useDependencies } from "@/src/presentation/hooks/useDependencies";
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
    const dependecies : Dependencies = useDependencies();
    const [decks, setDecks] = React.useState<DeckType[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const loader: IDeckLoader = dependecies.deckLoader;

    const loadData = async () => {
        try {
            const data = await loader.load();
            setDecks(data);
        } catch (error) {
            console.error('Error loading decks:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    React.useEffect(() => {
        loadData();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2f95dc" />
                <Text style={styles.emptyText}>Cargando mazos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={decks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Deck {...item} />}
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