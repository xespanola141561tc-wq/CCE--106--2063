import { Stack } from 'expo-router';
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return <AuthProvider><Stack><Stack.Screen name="login" options={{ headerShown: false }} /><Stack.Screen name="(tabs)" options={{ headerShown: false }} /><Stack.Screen name="grades" options={{ title: "My Grades", headerBackTitle: "Portal" }} /><Stack.Screen name="events/[id]" options={{ title: 'Event Details', headerBackTitle: 'Back' }} /></Stack></AuthProvider>;
}
