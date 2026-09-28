import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import Checkbox from './Checkbox';
import Field, { PasswordToggle } from './Field';
import { colors } from '../theme';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <View>
      <Field
        label="Email Address"
        icon="@"
        value={email}
        onChangeText={setEmail}
        placeholder="name@example.com"
        keyboardType="email-address"
      />

      <Field
        label="Password"
        icon="⚿"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry={!showPassword}
        right={
          <PasswordToggle
            visible={showPassword}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <View style={styles.optionsRow}>
        <Checkbox
          checked={rememberMe}
          onToggle={() => setRememberMe(!rememberMe)}>
          Remember me
        </Checkbox>
        <Pressable>
          <Text style={styles.link}>Forgot password?</Text>
        </Pressable>
      </View>

      <Button label="Sign In  →" />

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR CONTINUE AS</Text>
        <View style={styles.dividerLine} />
      </View>

      <Button label="▢  Play as Guest" variant="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  link: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    marginBottom: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.placeholder,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginHorizontal: 12,
  },
});

export default SignInForm;
