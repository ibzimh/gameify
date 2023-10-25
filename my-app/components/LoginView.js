import React, { useState } from "react";
import { Text, View, Button, Linking } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from "qs"; // npm install --save qs
import randomString from "random-string"; // npm install --save random-string
import Hashes from "jshashes"; // npm install --save jshashes

import URL from "url-parse"; // npm install --save url-parse

import Config from "../env";

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

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.changeEventListener = null;
  }

  state = {};

  handleOpenUrl = (url) => {
    console.log("handling open url");
    this.handleRedirectUri(url);
  };

  componentDidMount() { 
    console.log("the component mounted");
    this.changeEventListener = Linking.addEventListener(
      "url",
      this.handleOpenUrl
    );
    Linking.getInitialURL().then((url) => {
      if (url) this.handleRedirectUri(url);
    });
  }

  componentWillUnmount() {
    console.log("the component will unmount");
    this.changeEventListener.remove();
  }

  handleRedirectUri(urlString) {
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
    .then((user) => this.setState({ user }))
    .catch((err) => {
        console.warn("something went wrong", err);
    }));
  }

  handleLogin = (key) => {
    const loginProvider = loginProviders[key];
    // this.setState({ loginProvider });
    const { client_id, redirect_uri, response_type, scope, authorization_endpoint } = loginProvider;

    const state = randomString();

    const params = { client_id, redirect_uri, response_type, scope, state };
    const authorizationUrl = authorization_endpoint + "?" + qs.stringify(params);

    console.log(authorizationUrl);
    console.log(redirect_uri);
    Linking.openURL(authorizationUrl);
  };

  render() {
    const { loginProvider } = this.state;
    const handleLogin = this.handleLogin;

    if (loginProvider) {
      return <Text>Logging you in with {loginProvider.title}</Text>;
    }

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
}

export default LoginView;