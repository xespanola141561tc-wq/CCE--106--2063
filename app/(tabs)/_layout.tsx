import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs, type Href } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function TabLayout() {
  const { isRestoring, token } = useAuth();
  if (isRestoring) return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ActivityIndicator size="large" color="#4F46E5" /></View>;
  if (!token) return <Redirect href={"/login" as Href} />;
  return (
    <Tabs
      initialRouteName="profile"
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#F8FCFC" },
        headerTitleStyle: { color: "#102433", fontWeight: "800" },
        tabBarActiveTintColor: "#16B978",
        tabBarInactiveTintColor: "#748187",
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 7,
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E4ECEE",
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
      }}
    >
      <Tabs.Screen
        name="quotes"
        options={{
          headerShown: false,
          title: "Quote of the Day",
          tabBarLabel: "Quotes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Student Portal",
          tabBarLabel: "Student Portal",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Campus Events",
          tabBarLabel: "Events",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
