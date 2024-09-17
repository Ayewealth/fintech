import Colors from "@/constants/Colors";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserInactivityProvider } from "@/context/UserInactivity";

const queryClient = new QueryClient();
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(auth)/(tabs)/home");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#000" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={30} color={Colors.dark} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={30} color={Colors.dark} />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <Link href={"/help"} asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="help-circle-outline"
                    size={30}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </Link>
            );
          },
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: "Help",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={30} color={Colors.dark} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="(auth)/(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(auth)/crypto/[id]"
        options={{
          title: "",
          headerLargeTitle: true,
          headerTransparent: true,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={30} color={Colors.dark} />
              </TouchableOpacity>
            );
          },
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity>
                <Ionicons
                  name="notifications-outline"
                  color={Colors.dark}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="star-outline" color={Colors.dark} size={30} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="(auth)/(modals)/lock"
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="(auth)/(modals)/account"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          title: "",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="close-outline" size={34} color={"#fff"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <UserInactivityProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <InitialLayout />
            </GestureHandlerRootView>
          </UserInactivityProvider>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
