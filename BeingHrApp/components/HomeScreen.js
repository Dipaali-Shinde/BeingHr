// LoginScreen.js
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate("Log In");
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.description}>Welcome</Text>
      <Image source={require("../assets/logo.jpeg")} style={styles.topImage} />
      <Text style={styles.description}></Text>

      <AppButton
        title="Log In"
        backgroundColor="#0a66c2"
        textColor="#fff"
        onPress={navigateToLogin}
      />

      <AppButton
        title="Continue with google"
        backgroundColor="#fff"
        borderColor="black"
        textColor="black"
        //  onPress={navigateTogoogleauth}
      />
      <AppButton
        title="Continue with Linkedin"
        backgroundColor="#fff"
        borderColor="black"
        textColor="black"
        //  onPress={navigateTolinkedin}
      />
    </View>
  );
};

const AppButton = ({
  onPress,
  title,
  backgroundColor,
  borderColor,
  textColor,
}) => {
  const buttonStyles = [styles.appButtonContainer];
  const textStyles = [styles.appButtonText];

  if (backgroundColor) {
    buttonStyles.push({ backgroundColor });
  }

  if (borderColor) {
    buttonStyles.push({ borderColor, borderWidth: 2 });
  }
  if (textColor) {
    textStyles.push({ color: textColor });
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    marginTop: -4,
  },
  topImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },

  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 350,
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 20,
  },
  description: {
    marginBottom: 55,
    marginTop: 5,
    lineHeight: 30,
    paddingHorizontal: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  appButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "capitalize",
  },
});

export default HomeScreen;
