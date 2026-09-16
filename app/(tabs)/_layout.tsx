import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#F6F8FC" },
        headerTitleStyle: { color: "#14213D", fontWeight: "800" },
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#7A8496",
        tabBarStyle: { height: 64, paddingTop: 7 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "EventMate",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Explore events",
          tabBarLabel: "Events",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Your profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
