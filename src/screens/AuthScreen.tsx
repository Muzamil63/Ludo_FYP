import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import { colors } from '../theme';

type Tab = 'signIn' | 'signUp';

// Text that changes depending on which tab is open.
const copy = {
  signIn: {
    title: 'Sign In',
    heading: 'Ludo Classic',
    subtitle: 'Sign in to continue your match progress and preserve your rating.',
    footer: "Don't have an account?",
    footerLink: 'Sign Up',
  },
  signUp: {
    title: 'Create Account',
    heading: 'Create Account',
    subtitle: 'Join players worldwide or play with friends',
    footer: 'Already have an account?',
    footerLink: 'Sign In',
  },
};

function AuthScreen() {
  const [tab, setTab] = useState<Tab>('signIn');
  const text = copy[tab];
  const otherTab: Tab = tab === 'signIn' ? 'signUp' : 'signIn';

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.iconButton}>
          <Text style={styles.backGlyph}>‹</Text>
        </Pressable>
        <Text style={styles.topTitle}>{text.title}</Text>
        <Pressable style={styles.avatarButton}>
          <Text style={styles.avatarGlyph}>●</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        {/* Logo + heading */}
        <View style={styles.logoBox}>
          <View style={styles.dotRow}>
            <View style={[styles.dot, { backgroundColor: colors.primary }]} />
            <View style={[styles.dot, { backgroundColor: colors.success }]} />
          </View>
          <View style={styles.dotRow}>
            <View style={[styles.dot, { backgroundColor: colors.warning }]} />
            <View style={[styles.dot, { backgroundColor: colors.dark }]} />
          </View>
        </View>
        <Text style={styles.heading}>{text.heading}</Text>
        <Text style={styles.subtitle}>{text.subtitle}</Text>

        {/* Sign In / Sign Up switch */}
        <View style={styles.tabs}>
          <TabButton
            id="signIn"
            label="Sign In"
            active={tab === 'signIn'}
            onPress={() => setTab('signIn')}
          />
          <TabButton
            id="signUp"
            label="Sign Up"
            active={tab === 'signUp'}
            onPress={() => setTab('signUp')}
          />
        </View>

        {tab === 'signIn' ? <SignInForm /> : <SignUpForm />}

        <Text style={styles.footerText}>
          {text.footer}{' '}
          <Text style={styles.footerLink} onPress={() => setTab(otherTab)}>
            {text.footerLink}
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
}

type TabButtonProps = {
  id: Tab;
  label: string;
  active: boolean;
  onPress: () => void;
};

function TabButton({ id, label, active, onPress }: TabButtonProps) {
  return (
    <Pressable
      testID={`tab-${id}`}
      style={[styles.tab, active && styles.tabActive]}
      onPress={onPress}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backGlyph: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 32,
  },
  topTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarGlyph: {
    color: colors.onPrimary,
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.cardMuted,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  dotRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 3,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  heading: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.cardMuted,
    borderRadius: 12,
    padding: 4,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: colors.card,
    elevation: 2,
  },
  tabText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.primary,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '700',
  },
});

export default AuthScreen;
