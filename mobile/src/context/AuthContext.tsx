import { createContext, ReactNode, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

interface UserProps {
  name: String;
  avatar: String;
}

export interface AuthContextProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "936962110769-m9podbjp2pa6durhbf5vs3a5v40kof7i.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (error) {
      console.log("Error", error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInGoogle(access_token: string) {
    console.log("Token", access_token);
  }

  /*   useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      signInGoogle(response.authentication.accessToken);
    }
    console.log(response.type);
  }, []); */

  return (
    <AuthContext.Provider value={{ signIn, user, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
