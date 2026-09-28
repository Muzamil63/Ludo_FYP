import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme';

type FieldProps = {
  label: string;
  icon: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  labelRight?: React.ReactNode;
  right?: React.ReactNode;
};

// Labeled text input with a small icon on the left and optional element on the right.
function Field(props: FieldProps) {
  return (
    <View style={styles.field}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{props.label}</Text>
        {props.labelRight}
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.icon}>{props.icon}</Text>
        <TextInput
          style={styles.input}
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={props.secureTextEntry}
          keyboardType={props.keyboardType}
          autoCapitalize="none"
        />
        {props.right}
      </View>
    </View>
  );
}

// Green circle with a tick, shown when a field value is valid.
export function CheckMark() {
  return (
    <View style={styles.checkCircle}>
      <Text style={styles.checkTick}>✓</Text>
    </View>
  );
}

type PasswordToggleProps = {
  visible: boolean;
  onPress: () => void;
};

// Eye button that shows or hides a password.
export function PasswordToggle({ visible, onPress }: PasswordToggleProps) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.eye}>{visible ? '◉' : '◎'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 14,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
  },
  icon: {
    color: colors.placeholder,
    fontSize: 16,
    width: 26,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    paddingVertical: 0,
  },
  eye: {
    color: colors.placeholder,
    fontSize: 18,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkTick: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default Field;
