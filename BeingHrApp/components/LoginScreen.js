import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useForm, Controller } from "react-hook-form";

const LoginScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const navigateToSignup = () => {
    navigation.navigate("Sign Up");
  };

  const handleLogin = async (data) => {
    if (data.mobileNumber === "1234567890") {
      setErrorMessage("Mobile number already registered.");
      return;
    }

    navigation.navigate("OTP", { mobileNumber: data.mobileNumber });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.placeholder}>Proceed with</Text>
        <Text style={styles.label}>Your Mobile Number</Text>
        <Controller
          control={control} // Pass the control object to the Controller component
          render={({ field }) => (
            <TextInput
              style={[styles.input, errors.phoneNumber && styles.errorInput]}
              keyboardType="phone-pad"
              placeholder="Your Mobile Number"
              onChangeText={field.onChange}
              value={field.value}
              maxLength={10}
            />
          )}
          name="mobileNumber"
          rules={{
            required: "Please enter your mobile number",
            pattern: {
              value: /^[0-9]*$/,
              message: "Please enter a valid mobile number",
            },
            minLength: {
              value: 10,
              message: "Mobile number must be 10 digits",
            },
            maxLength: {
              value: 10,
              message: "Mobile number must be 10 digits",
            },
          }}
        />
        {errors.mobileNumber && (
          <Text style={styles.errorText}>{errors.mobileNumber.message}</Text>
        )}
      </View>
      <AppButton
        title="Get OTP"
        backgroundColor="#0a66c2"
        textColor="#fff"
        onPress={handleSubmit(handleLogin)} // Use handleSubmit to handle form submission
      />
      <View style={styles.signupContainer}>
        <Text style={styles.signupTextBlack}>Don't have an account? </Text>
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={styles.signupTextBlue}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const AppButton = ({ onPress, title, backgroundColor, textColor }) => {
  const buttonStyles = [styles.appButtonContainer];
  const textStyles = [styles.appButtonText];

  if (backgroundColor) {
    buttonStyles.push({ backgroundColor });
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
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  content: {
    width: "100%",
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 20,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
  },
  input: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  signupTextBlack: {
    fontSize: 16,
    color: "#000",
  },
  signupTextBlue: {
    fontSize: 16,
    color: "#0a66c2",
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 350,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a66c2",
    marginBottom: 20,
  },
  appButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
    textTransform: "capitalize",
  },
});

export default LoginScreen;
