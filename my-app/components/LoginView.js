import React, { useState } from "react";
import { Text, View, Button, Linking } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from "qs"; // npm install --save qs
import randomString from "random-string"; // npm install --save random-string
import Hashes from "jshashes"; // npm install --save jshashes
import { authorize } from 'react-native-app-auth'; // npm install --save react-native-app-auth

import URL from "url-parse"; // npm install --save url-parse

import Config from "../env";

const loginProviders = {
  google: {
    title: "Google",
    redirect_uri: Config.BACKEND + "/google/oauth2callback", // where google will send the user back to
    client_id: Config.GOOGLE_CLIENT_ID,
    response_type: "code",
    scope: "profile email",
    token_endpoint: Config.BACKEND + "/oauth2/google/token",
    // grant_type: "access_code",
    authorization_endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  },
};

const config = {
  issuer: 'https://accounts.google.com',
  clientId: Config.GOOGLE_CLIENT_ID,
  redirectUrl: Config.BACKEND + '/google/oauth2callback',
  scopes: ['openid', 'profile', 'email'],
};

const handleLogin = async () => {
  try {
    const result = await authorize(config);
    console.log('Authorization Response', result);
  } catch (error) {
    console.error('Hey! Theres an authorization error', error);
  }
};

function LoginView(props) {
  return (
    <View>
      <Text>Choose how you want to log in</Text>
      {Object.entries(loginProviders).map(([key, provider]) => (
        <Button
          title={provider.title}
          onPress={() => handleLogin()}
          key={key}
        />
      ))}
    </View>
  );
}

export default LoginView;