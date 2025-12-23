import Colors from "@/src/shared/constants/Colors";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function ModalLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].secondaryColor,
        },
        contentStyle: {
          backgroundColor:
            Colors[colorScheme ?? "light"].quinaryColor,
        },
      }}
    >
      <Stack.Screen
        name="model-settings"
        options={{
          title: "Ajustes del modelo",
        }}
      />

      <Stack.Screen
        name="about-us"
        options={{
          title: "Sobre nosotros",
        }}
      />

    </Stack>
  );
}
