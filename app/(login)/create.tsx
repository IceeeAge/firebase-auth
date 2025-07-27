import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebaseConfig';
export default function Create() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const signUp = async (): Promise<void> => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
      // Optionally: navigate to a home page here
      // router.replace('/(auth)/home');
    } catch (err) {
      const error = err as FirebaseError;
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
        />
        {loading ? (
          <ActivityIndicator size="small" style={{ margin: 28 }} />
        ) : (
          <>
            <Button onPress={signUp} title="Create account" />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});
