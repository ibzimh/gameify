import React, { useState, useEffect } from "react";
import { Text, View, Button, Linking, StyleSheet, TouchableOpacity } from "react-native";;

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

function LoginView({setUser: setUser}) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      backgroundColor: '#F5F5F5',
      borderRadius: 25,
      display: 'flex',
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
    },
    login: {
      height: 40,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor:'#2b2684',
      borderRadius: 15,
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      marginBottom: 20,
      color: '#2b2684',
      transition: 0.5,
      // width: 20,
      // marginRight: 10,
      paddingTop: 5,
      paddingRight: 15,
      paddingBottom: 5,
      paddingLeft: 15,
    },
    register: {
      height: 25,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor:'#2b2684',
      borderRadius: 10,
      justifyContent: 'center',
      color: '#2b2684',
      transition: 0.5,
      paddingTop: 5,
      paddingRight: 15,
      paddingBottom: 5,
      paddingLeft: 15,
    },
    googleButton: {
      width: 20,
      marginRight: 10,
    },
    registerText: {
      color: '#2b2684',
      textAlign: 'center',
      fontSize: 10,
      fontWeight: 'bold',
    },
    loginText: {
      color: '#2b2684',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

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
    <View style={styles.container}>
        <TouchableOpacity style={styles.login} onPress={() => handleLogin('google')}>
          <Text style={styles.loginText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.register} onPress={() => {setUser(true)}}>
          <Text style={styles.registerText}>Sneak In</Text>
        </TouchableOpacity>
    </View>
  );
}

export default LoginView;