import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import Checkbox from './Checkbox';
import Field, { CheckMark, PasswordToggle } from './Field';
import { colors } from '../theme';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const strength = getPasswordStrength(password);
  const usernameOk = username.trim().length >= 3;
  const confirmOk = confirmPassword.length > 0 && confirmPassword === password;

  return (
    <View>
      <Field
        label="PLAYER USERNAME"
        icon="@"
        value={username}
        onChangeText={setUsername}
        placeholder="Alex_99"
        right={usernameOk ? <CheckMark /> : null}
      />

      <Field
        label="EMAIL ADDRESS"
        icon="✉"
        value={email}
        onChangeText={setEmail}
        placeholder="name@example.com"
        keyboardType="email-address"
      />

      <Field
        label="PASSWORD"
        labelRight={
          password.length > 0 ? (
            <Text style={styles.strengthText}>{strength.label}</Text>
          ) : null
        }
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
      <View style={styles.strengthRow}>
        {[0, 1, 2, 3].map(index => (
          <View
            key={index}
            style={[
              styles.strengthBar,
              index < strength.score && styles.strengthBarFilled,
            ]}
          />
        ))}
      </View>

      <Field
        label="CONFIRM PASSWORD"
        icon="↻"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="••••••••"
        secureTextEntry={!showPassword}
        right={confirmOk ? <CheckMark /> : null}
      />

      <View style={styles.termsRow}>
        <Checkbox checked={agreed} onToggle={() => setAgreed(!agreed)}>
          I agree to the <Text style={styles.link}>Terms of Service</Text> &{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Checkbox>
      </View>

      <Button label="Create Account  →" />
      <Button label="▢  Play as Guest instead" variant="secondary" />
    </View>
  );
}

// Very simple strength rule based on length only. Score fills 0-4 bars.
function getPasswordStrength(password: string) {
  if (password.length === 0) {
    return { score: 0, label: '' };
  }
  if (password.length < 6) {
    return { score: 1, label: 'Weak' };
  }
  if (password.length < 10) {
    return { score: 2, label: 'Medium' };
  }
  return { score: 4, label: 'Strong' };
}

const styles = StyleSheet.create({
  strengthText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '700',
  },
  strengthRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: -6,
    marginBottom: 14,
  },
  strengthBar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  strengthBarFilled: {
    backgroundColor: colors.success,
  },
  termsRow: {
    marginBottom: 18,
  },
  link: {
    color: colors.primary,
  },
});

export default SignUpForm;
