import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo } from "react";
import "react-native-reanimated";

import initDependencies from "@/src/dependencies/initDependencies";
import { useColorScheme } from "@/src/presentation/hooks/useColorScheme";
import { DeckStoreContextProvider } from "@/src/presentation/providers/DeckStoreProvider";
import { DependenciesProvider } from "@/src/presentation/providers/DependenciesProvider";
import DeckInstalledStore from "@/src/presentation/stores/DeckInstalledStore";
import * as Notifications from 'expo-notifications';
import { Platform } from "react-native";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useEffect(() => {
        // Configurar notificaciones al iniciar la app
        const setupNotifications = async () => {
            // Configurar handler para notificaciones en primer plano
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldPlaySound: true,
                    shouldSetBadge: false,
                    shouldShowAlert: true,
                    shouldShowBanner: true, // Añadir esta propiedad
                    shouldShowList: true, // Añadir esta propiedad
                }),
            });
            
            // Configurar canal para Android
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'Notificaciones por defecto',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                    sound: 'default',
                });
            }
        };
        
        setupNotifications();
    }, []);

    const [loaded, error] = useFonts({
        SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();
    const dependencies = useMemo(() => initDependencies(), []);
    const stores = useMemo(
        () => ({
            installed : new DeckInstalledStore(dependencies.decksLocalLoader),
        }),
        []
    );

    return (
        <DependenciesProvider dependencies={dependencies}>
            <DeckStoreContextProvider stores={stores}>
                <ThemeProvider
                    value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="(modals)"
                            options={{ presentation: "modal", headerShown: false, }}
                        />
                    </Stack>
                </ThemeProvider>
            </DeckStoreContextProvider>
        </DependenciesProvider>
    );
}
