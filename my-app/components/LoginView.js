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
    redirect_uri: Config.BACKEND + "/google/oauth2callback",
    client_id: Config.GOOGLE_CLIENT_ID,
    response_type: "code",
    scope: "profile email",
    code_challenge_method: "S256",
    token_endpoint: Config.BACKEND + "/oauth2/google/token",
    grant_type: "access_code",
  },
  azure: {
    title: "Log in with your organization",
  },
  idPorten: {
    title: "Log in with ID-porten",
  },
};

function sha256base64urlencode(str) {
  // https://tools.ietf.org/html/rfc7636#appendix-A
  // https://tools.ietf.org/html/rfc4648#section-5
  return new Hashes.SHA256()
    .b64(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+/g, "");
}

export default class LoginView extends React.Component {
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

    const { token_endpoint, grant_type, client_id, redirect_uri } =
      loginProvider;

    Promise.all([
      AsyncStorage.getItem("state"),
      AsyncStorage.getItem("code_verifier"),
    ]).then(([request_state, request_code_verifier]) => {
      AsyncStorage.removeItem("state");
      AsyncStorage.removeItem("code_verifier");
      if (state != request_state) {
        console.log(
          "State mismatch, don't carry out the token request",
          state,
          request_state
        );
        return;
      }

      const code_verifier = request_code_verifier || undefined;

      const payload = {
        code,
        code_verifier,
        client_id,
        redirect_uri,
        grant_type,
      };
      console.log(qs.stringify(payload));
      return fetch(token_endpoint, {
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
        });
    });
  }

  handleLogin = (key) => {
    const loginProvider = loginProviders[key];
    this.setState({ loginProvider });
    const {
      client_id,
      authorization_endpoint,
      redirect_uri,
      response_type,
      scope,
      code_challenge_method,
    } = loginProvider;

    const code_verifier = code_challenge_method && randomString({ length: 40 });
    const code_challenge =
      code_challenge_method && sha256base64urlencode(code_verifier);

    const state = randomString();

    const params = {
      client_id,
      redirect_uri,
      response_type,
      scope,
      state,
      code_challenge_method,
      code_challenge,
    };
    const authorizationUrl =
      authorization_endpoint + "?" + qs.stringify(params);

    Promise.all([
      AsyncStorage.setItem("code_verifier", code_verifier || ""),
      AsyncStorage.setItem("state", state),
    ])
      .then(() => {
        console.log(authorizationUrl);
        Linking.openURL(authorizationUrl);
      })
      .catch((err) => {
        console.warn(err);
      });
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
