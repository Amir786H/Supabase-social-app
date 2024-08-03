import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  // TODO: Implement _layout. This is where you define the global routing structure of your app.
  const { setAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session user: ", session?.user);

      if (session) {
        setAuth(session?.user);
        router.replace('/home');
      } else {
        setAuth(null);
        router.replace('/welcome');
      }
    });
  },[]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;
