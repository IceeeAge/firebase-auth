import React from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from '../../firebaseConfig'; // adjust path as needed
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

const Page = () => {
  const user = auth.currentUser;
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Signed out successfully!');
       router.replace('/(login)/login'); // Redirect to login page after sign out
      // Optionally: navigate to a login page here
      // router.replace('/(login)/login');
    } catch (error:any) {
      alert('Sign out failed: ' + error.message);
    }
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Welcome back {user?.email}
      </Text>
      <Button
        title="Sign out"
        onPress={handleSignOut}
      />
    </View>
  );
};

export default Page;
