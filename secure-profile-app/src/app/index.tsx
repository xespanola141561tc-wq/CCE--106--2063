import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';

const API_BASE_URL = 'https://dummyjson.com';
const TOKEN_KEY = 'secure-profile-access-token';
const COLORS = {
  ink: '#14263f',
  muted: '#718096',
  navy: '#173b68',
  blue: '#2869d8',
  pale: '#f2f6fb',
  line: '#dce5ef',
  white: '#ffffff',
  green: '#198754',
  red: '#b42318',
};

type UserProfile = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  gender?: string;
};

let webSessionToken: string | null = null;

async function readToken() {
  return Platform.OS === 'web' ? webSessionToken : SecureStore.getItemAsync(TOKEN_KEY);
}

async function saveToken(token: string) {
  if (Platform.OS === 'web') webSessionToken = token;
  else await SecureStore.setItemAsync(TOKEN_KEY, token);
}

async function removeToken() {
  if (Platform.OS === 'web') webSessionToken = null;
  else await SecureStore.deleteItemAsync(TOKEN_KEY);
}

async function fetchProfile(token: string): Promise<UserProfile> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(response.status === 401 ? 'Your session expired. Please sign in again.' : 'Could not load your profile.');
  return response.json();
}

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const restoreSession = useCallback(async () => {
    try {
      const token = await readToken();
      if (token) setProfile(await fetchProfile(token));
    } catch (cause) {
      await removeToken();
      setError(cause instanceof Error ? cause.message : 'Could not restore your session.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  const signIn = async () => {
    setError('');
    setNotice('');
    if (!username.trim() || !password) {
      setError('Enter both your username and password.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password, expiresInMins: 30 }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Login failed. Check your username and password.');
      const token = result.accessToken || result.token;
      if (!token) throw new Error('The server did not return an access token.');
      await saveToken(token);
      const authenticatedProfile = await fetchProfile(token);
      setProfile(authenticatedProfile);
      setPassword('');
    } catch (cause) {
      await removeToken();
      setProfile(null);
      setError(cause instanceof Error ? cause.message : 'Unable to sign in. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const signOut = async () => {
    setError('');
    try {
      await removeToken();
      setProfile(null);
      setPassword('');
      setNotice('You are signed out. Your saved session token was deleted.');
    } catch {
      setError('Could not remove the saved token. Please try again.');
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.brandRow}>
              <View style={styles.brandMark}><Text style={styles.brandMarkText}>S</Text></View>
              <Text style={styles.brandName}>Secure Profile</Text>
              <View style={styles.securePill}><Text style={styles.securePillText}>●  PRIVATE</Text></View>
            </View>

            {loading ? (
              <View style={styles.loadingCard}>
                <ActivityIndicator color={COLORS.blue} size="large" />
                <Text style={styles.loadingText}>Checking your secure session…</Text>
              </View>
            ) : profile ? (
              <View style={styles.card}>
                <View style={styles.eyebrow}><View style={styles.liveDot} /><Text style={styles.eyebrowText}>AUTHENTICATED SESSION</Text></View>
                <Text style={styles.heading}>Your profile</Text>
                <Text style={styles.description}>Your protected details were loaded using your access token.</Text>

                <View style={styles.profileHero}>
                  {profile.image ? <Image source={{ uri: profile.image }} style={styles.avatar} /> : <View style={styles.avatarFallback}><Text style={styles.avatarInitial}>{profile.firstName?.[0] || '?'}</Text></View>}
                  <View style={styles.profileNameWrap}>
                    <Text style={styles.profileName}>{profile.firstName} {profile.lastName}</Text>
                    <Text style={styles.profileHandle}>@{profile.username}</Text>
                  </View>
                </View>

                <View style={styles.infoList}>
                  <ProfileRow label="Full name" value={`${profile.firstName} ${profile.lastName}`} />
                  <ProfileRow label="Username" value={profile.username} />
                  <ProfileRow label="Email address" value={profile.email} />
                  <ProfileRow label="User ID" value={`#${profile.id}`} last />
                </View>
                <View style={styles.tokenNote}><Text style={styles.tokenIcon}>✓</Text><Text style={styles.tokenNoteText}>Access token is stored securely on this device.</Text></View>
                {error ? <Message tone="error">{error}</Message> : null}
                {notice ? <Message tone="success">{notice}</Message> : null}
                <Pressable accessibilityRole="button" onPress={signOut} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
                  <Text style={styles.secondaryButtonText}>Log out</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.card}>
                <View style={styles.eyebrow}><View style={styles.lockDot} /><Text style={styles.eyebrowText}>SECURE SIGN IN</Text></View>
                <Text style={styles.heading}>Welcome back</Text>
                <Text style={styles.description}>Sign in to access your private profile. Your password is sent only to the authentication API and is never saved.</Text>

                <Text style={styles.label}>Username</Text>
                <TextInput
                  accessibilityLabel="Username"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!submitting}
                  onChangeText={setUsername}
                  onSubmitEditing={() => undefined}
                  placeholder="Enter your username"
                  placeholderTextColor="#9aa8b8"
                  returnKeyType="next"
                  style={styles.input}
                  value={username}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                  accessibilityLabel="Password"
                  autoCapitalize="none"
                  editable={!submitting}
                  onChangeText={setPassword}
                  onSubmitEditing={() => void signIn()}
                  placeholder="Enter your password"
                  placeholderTextColor="#9aa8b8"
                  returnKeyType="go"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                />
                {error ? <Message tone="error">{error}</Message> : null}
                {notice ? <Message tone="success">{notice}</Message> : null}
                <Pressable accessibilityRole="button" disabled={submitting} onPress={() => void signIn()} style={({ pressed }) => [styles.primaryButton, (pressed || submitting) && styles.pressed, submitting && styles.disabled]}>
                  {submitting ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.primaryButtonText}>Sign in securely  →</Text>}
                </Pressable>

                <View style={styles.trustPanel}>
                  <Text style={styles.trustTitle}>Your session stays protected</Text>
                  <Text style={styles.trustText}>We use encrypted device storage for your token. It is attached to requests that need authentication and deleted when you log out.</Text>
                </View>
                <Text style={styles.demoHint}>Demo API account: <Text style={styles.demoStrong}>emilys</Text> · <Text style={styles.demoStrong}>emilyspass</Text></Text>
              </View>
            )}

            <Text style={styles.footer}>CCE106  ·  SECURE PROFILE APP LAB</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function ProfileRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return <View style={[styles.infoRow, !last && styles.infoRowBorder]}><Text style={styles.infoLabel}>{label}</Text><Text style={styles.infoValue}>{value}</Text></View>;
}

function Message({ children, tone }: { children: string; tone: 'error' | 'success' }) {
  return <View style={[styles.message, tone === 'error' ? styles.errorBox : styles.successBox]}><Text style={tone === 'error' ? styles.errorText : styles.successText}>{children}</Text></View>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: COLORS.pale },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingVertical: 32, paddingHorizontal: 20 },
  container: { width: '100%', maxWidth: 480, alignSelf: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 10 },
  brandMark: { width: 36, height: 36, borderRadius: 11, backgroundColor: COLORS.navy, alignItems: 'center', justifyContent: 'center' },
  brandMarkText: { color: COLORS.white, fontSize: 19, fontWeight: '800' },
  brandName: { color: COLORS.ink, fontSize: 16, fontWeight: '700', flex: 1 },
  securePill: { backgroundColor: '#e7f5ed', borderRadius: 20, paddingVertical: 7, paddingHorizontal: 10 },
  securePillText: { color: COLORS.green, fontSize: 9, letterSpacing: 0.7, fontWeight: '800' },
  card: { backgroundColor: COLORS.white, borderColor: COLORS.line, borderWidth: 1, borderRadius: 20, padding: 25, shadowColor: '#19385d', shadowOpacity: 0.07, shadowRadius: 22, shadowOffset: { width: 0, height: 10 }, elevation: 3 },
  loadingCard: { minHeight: 250, backgroundColor: COLORS.white, borderColor: COLORS.line, borderWidth: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center', gap: 16 },
  loadingText: { color: COLORS.muted, fontSize: 14 },
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.green },
  lockDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.blue },
  eyebrowText: { color: COLORS.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1.25 },
  heading: { color: COLORS.ink, fontSize: 29, lineHeight: 36, fontWeight: '700', letterSpacing: -0.7 },
  description: { color: COLORS.muted, fontSize: 14, lineHeight: 21, marginTop: 8, marginBottom: 24 },
  label: { color: COLORS.ink, fontSize: 12, fontWeight: '700', marginBottom: 8, marginTop: 4 },
  input: { height: 48, borderRadius: 10, borderWidth: 1, borderColor: COLORS.line, color: COLORS.ink, backgroundColor: COLORS.white, paddingHorizontal: 13, fontSize: 14, marginBottom: 16 },
  primaryButton: { minHeight: 50, borderRadius: 10, backgroundColor: COLORS.blue, alignItems: 'center', justifyContent: 'center', marginTop: 7 },
  primaryButtonText: { color: COLORS.white, fontSize: 14, fontWeight: '700' },
  secondaryButton: { minHeight: 48, borderRadius: 10, borderWidth: 1, borderColor: COLORS.line, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  secondaryButtonText: { color: COLORS.ink, fontSize: 14, fontWeight: '700' },
  pressed: { opacity: 0.78 },
  disabled: { opacity: 0.65 },
  trustPanel: { backgroundColor: '#f4f8fd', borderRadius: 11, padding: 14, marginTop: 20 },
  trustTitle: { color: COLORS.navy, fontSize: 12, fontWeight: '700', marginBottom: 5 },
  trustText: { color: COLORS.muted, fontSize: 11, lineHeight: 17 },
  demoHint: { color: COLORS.muted, fontSize: 11, textAlign: 'center', marginTop: 18 },
  demoStrong: { color: COLORS.ink, fontWeight: '700' },
  profileHero: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#f6f9fd', borderRadius: 13, padding: 14, marginBottom: 18 },
  avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#e4ecf6' },
  avatarFallback: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#e4ecf6', alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { color: COLORS.navy, fontSize: 23, fontWeight: '700' },
  profileNameWrap: { flex: 1 },
  profileName: { color: COLORS.ink, fontSize: 17, fontWeight: '700' },
  profileHandle: { color: COLORS.muted, fontSize: 13, marginTop: 3 },
  infoList: { borderTopWidth: 1, borderTopColor: COLORS.line },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 46, gap: 14 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: '#edf1f6' },
  infoLabel: { color: COLORS.muted, fontSize: 12 },
  infoValue: { color: COLORS.ink, fontSize: 12, fontWeight: '600', flexShrink: 1, textAlign: 'right' },
  tokenNote: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#eaf6ef', borderRadius: 9, padding: 11, marginTop: 14 },
  tokenIcon: { color: COLORS.green, fontSize: 14, fontWeight: '800' },
  tokenNoteText: { color: '#246b45', fontSize: 11, flex: 1 },
  message: { borderRadius: 9, padding: 11, marginTop: 12 },
  errorBox: { backgroundColor: '#fef0ee' },
  successBox: { backgroundColor: '#eaf6ef' },
  errorText: { color: COLORS.red, fontSize: 12, lineHeight: 18 },
  successText: { color: '#246b45', fontSize: 12, lineHeight: 18 },
  footer: { color: '#93a1b1', fontSize: 9, letterSpacing: 1.3, textAlign: 'center', marginTop: 24 },
});
