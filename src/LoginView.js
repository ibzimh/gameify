import React, { useState, useEffect } from "react";
import { Text, View, Button, Linking } from "react-native";;

import qs from "qs";
import randomString from "random-string";
import URL from "url-parse";

import Config from "./env";

const loginProviders = {
  google: {
    title: "Google",
    redirect_uri: Config.BACKEND, // where google will send the user back to
    client_id: Config.GOOGLE_CLIENT_ID,
    response_type: "code",
    scope: "profile email",
    token_endpoint: Config.BACKEND + "/oauth2/google/token",
    authorization_endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  },
};

function LoginView({user, setUser}) {

  useEffect(() => {
    const changeEventListener = Linking.addEventListener("url", handleOpenUrl);
    Linking.getInitialURL().then((url) => {
      if (url) handleRedirectUri(url);
    });

    return () => {
      changeEventListener.remove();
    };
  }, []);
  
  const handleRedirectUri = (urlString) => {
    const url = new URL(urlString, true);
    const { code, state } = url.query;

    console.log("App url: " + url);

    if (!code) return;

    const providerName = url.pathname.split("/")[2];
    const loginProvider = loginProviders[providerName];

    const { token_endpoint, grant_type, client_id, redirect_uri } = loginProvider;

    Promise.all((res, rej) => fetch(token_endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify(payload),
    })
    .then((resp) => resp.json())
    .then((user) => setUser(user))
    .catch((err) => {
        console.warn("something went wrong", err);
    }));
  }

  const handleOpenUrl = (url) => {
    handleRedirectUri(url);
  };


  const handleLogin = (key) => {
    const loginProvider = loginProviders[key];
    const { client_id, redirect_uri, response_type, scope, authorization_endpoint } = loginProvider;

    const state = randomString();
    
    const params = { client_id, redirect_uri, response_type, scope, state };
    const authorizationUrl = authorization_endpoint + "?" + qs.stringify(params);

    console.log(authorizationUrl);
    console.log(redirect_uri);
    Linking.openURL(authorizationUrl);
  };

  return (
    <View>
      <Text>Choose how you want to log in</Text>
      {Object.entries(loginProviders).map(([key, provider]) => (
        <Button
          title={provider.title}
          onPress={() => handleLogin(key)}
          key={key}
        />
      ))}
    </View>
  );
}

export default LoginView;