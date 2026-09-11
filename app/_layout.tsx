import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1877F2' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="course/[id]" 
        options={{ 
          title: 'Course Details',
          headerBackTitle: 'Back',
        }} 
      />
      <Stack.Screen 
        name="student/[id]" 
        options={{ 
          title: 'Student ID Route',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  );
}
