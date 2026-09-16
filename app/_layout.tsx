import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="events/[id]" options={{ title: 'Event Details', headerBackTitle: 'Back' }} />
    </Stack>
  );
}
