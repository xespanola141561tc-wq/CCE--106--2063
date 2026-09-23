import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

type Quote = { quote: string; author: string };

const FALLBACK_QUOTE: Quote = {
  quote: "Success consists of going from failure to failure without loss of enthusiasm.",
  author: "Winston Churchill",
};

export default function QuotesScreen() {
  const [quote, setQuote] = useState<Quote>(FALLBACK_QUOTE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadQuote = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("The quote service is unavailable.");

      const data = (await response.json()) as Quote;
      setQuote({ quote: data.quote, author: data.author });
    } catch {
      setError("Could not refresh the quote. Showing the last one. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>BEGINNER PROJECT</Text>
      <Text style={styles.heading}>Quotes App</Text>
      <Text style={styles.subtitle}>A little inspiration for your day</Text>

      <View style={styles.quoteCard}>
        <Text style={styles.cardLabel}>QUOTE OF THE DAY</Text>
        {error ? <Text style={styles.error}>{error}</Text> : <View style={styles.errorSpacer} />}

        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#4AD0DE" />
            <Text style={styles.loadingText}>Finding a fresh quote...</Text>
          </View>
        ) : (
          <>
            <Ionicons name="chatbox-ellipses" size={35} color="#38C8DB" />
            <Text style={styles.quote}>“{quote.quote}”</Text>
            <View style={styles.authorRow}>
              <View style={styles.authorLine} />
              <Text style={styles.author}>{quote.author}</Text>
            </View>
          </>
        )}

        <View style={styles.cardFooter}>
          <Text style={styles.footerText}>WORDS TO LIVE BY</Text>
          <Ionicons name="sparkles-outline" size={20} color="#B8D2ED" />
        </View>
      </View>

      <Pressable onPress={loadQuote} disabled={isLoading} style={({ pressed }) => [styles.retryButton, (pressed || isLoading) && styles.pressed]}>
        {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Ionicons name="shuffle-outline" size={19} color="#FFFFFF" />}
        <Text style={styles.retryText}>{isLoading ? "LOADING" : "TRY AGAIN"}</Text>
      </Pressable>

      <View style={styles.tip}>
        <View style={styles.tipDot} />
        <Text style={styles.tipText}>Take what you need. Keep moving forward.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: "#F5FAFB", flex: 1, padding: 15, paddingTop: 31 },
  eyebrow: { color: "#438E96", fontSize: 10, fontWeight: "900", letterSpacing: 1.35 },
  heading: { color: "#14213D", fontSize: 28, fontWeight: "900", marginTop: 8 },
  subtitle: { color: "#75828A", fontSize: 14, marginTop: 6 },
  quoteCard: { alignItems: "center", backgroundColor: "#10386D", borderRadius: 25, elevation: 5, marginTop: 23, minHeight: 365, overflow: "hidden", padding: 24, shadowColor: "#0D2E58", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.24, shadowRadius: 11 },
  cardLabel: { color: "#39C4D6", fontSize: 11, fontWeight: "900", letterSpacing: 1 },
  error: { color: "#D7E6F7", fontSize: 12, lineHeight: 18, marginTop: 17, textAlign: "center" },
  errorSpacer: { height: 53 },
  loading: { alignItems: "center", flex: 1, justifyContent: "center" },
  loadingText: { color: "#D7E6F7", fontSize: 13, fontWeight: "700", marginTop: 14 },
  quote: { color: "#FFFFFF", fontSize: 23, fontWeight: "900", lineHeight: 32, marginTop: 16, textAlign: "center" },
  authorRow: { alignItems: "center", flexDirection: "row", gap: 9, marginTop: 24 },
  authorLine: { backgroundColor: "#38C8DB", height: 2, width: 20 },
  author: { color: "#D7E6F7", fontSize: 14, fontWeight: "800" },
  cardFooter: { alignItems: "center", borderTopColor: "#315882", borderTopWidth: 1, bottom: 0, flexDirection: "row", justifyContent: "space-between", left: 24, paddingTop: 14, position: "absolute", right: 24 },
  footerText: { color: "#B8D2ED", fontSize: 9, fontWeight: "900", letterSpacing: 1.35 },
  retryButton: { alignItems: "center", backgroundColor: "#12A9C1", borderRadius: 16, flexDirection: "row", gap: 9, justifyContent: "center", marginTop: 20, minHeight: 53 },
  retryText: { color: "#FFFFFF", fontSize: 13, fontWeight: "900", letterSpacing: 1.1 },
  pressed: { opacity: 0.72 },
  tip: { alignItems: "center", flexDirection: "row", gap: 8, justifyContent: "center", marginTop: 20 },
  tipDot: { backgroundColor: "#28BED2", borderRadius: 4, height: 6, width: 6 },
  tipText: { color: "#7A878E", fontSize: 11 },
});
