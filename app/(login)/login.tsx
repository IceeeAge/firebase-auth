import { Link, useRouter, } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { auth } from '../../firebaseConfig';

export default function Index() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful');
      Router.replace('/(tabs)/home'); // Redirect to home page after sign in
    } catch (err) {
      const error = err as FirebaseError;
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
           {loading ? (
          <ActivityIndicator size="small" style={{ margin: 28 }} />
        ) : (
          <>
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
     
            <View style={styles.buttonContainer}>
              <Button onPress={signIn} title="Login" />

              <View style={styles.space} />
             
              <Link href="/(login)/create" asChild>
                <Button title="Create account" />
              </Link>

              <View style={styles.space} />

              <Link href="/(login)/reset" asChild>
                <Button title="reset passowrd"></Button>
              </Link>
            </View>

          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
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
  buttonContainer: {
    marginVertical: 20,
  },
  space: {
    height: 12, // space between buttons
  },
});
