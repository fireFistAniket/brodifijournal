import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="add"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="[id]"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}
