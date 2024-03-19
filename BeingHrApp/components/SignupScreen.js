import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

const SignupScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (data) => {
    if (data.mobileNumber === "1234567890") {
      setErrorMessage("Mobile number already registered.");
      return;
    }

    navigation.navigate("OTP", { mobileNumber: data.mobileNumber });
  };

  const navigateToLogin = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>I am a</Text>
      <View style={styles.radioContainer}>
        <Controller
          control={control}
          render={({ field }) => (
            <TouchableOpacity
              style={[
                styles.radioButton,
                field.value === "female" && styles.selectedButton,
              ]}
              onPress={() => field.onChange("female")}
            >
              <Text style={styles.radioText}>Female</Text>
            </TouchableOpacity>
          )}
          name="gender"
          rules={{ required: "Please select your gender" }}
        />

        <Controller
          control={control}
          render={({ field }) => (
            <TouchableOpacity
              style={[
                styles.radioButton,
                field.value === "male" && styles.selectedButton,
              ]}
              onPress={() => field.onChange("male")}
            >
              <Text style={styles.radioText}>Male</Text>
            </TouchableOpacity>
          )}
          name="gender"
          rules={{ required: "Please select your gender" }}
        />
      </View>

      {errors.gender && (
        <Text style={styles.errorText}>{errors.gender.message}</Text>
      )}
      <View>
        <Text style={styles.label}>Your Full Name</Text>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={[styles.input, errors.fullName && styles.errorInput]}
              placeholder="Your Full name"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
          name="fullName"
          rules={{ required: "Please enter your full Name" }}
        />
        {errors.fullName && (
          <Text style={styles.errorText}>{errors.fullName.message}</Text>
        )}
      </View>
      <View>
        <Text style={styles.label}>Enter Email address</Text>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={[styles.input, errors.fullName && styles.errorInput]}
              placeholder="Enter Email address"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
          name="Email"
          rules={{ required: "Please enter your Email address" }}
        />
        {errors.fullName && (
          <Text style={styles.errorText}>{errors.Email.message}</Text>
        )}
      </View>
      <View>
        <Text style={styles.label}>Enter Password</Text>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={[styles.input, errors.fullName && styles.errorInput]}
              placeholder="Enter Password"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
          name="Password"
          rules={{ required: "Please enter your Password" }}
        />
        {errors.fullName && (
          <Text style={styles.errorText}>{errors.Password.message}</Text>
        )}
      </View>

      <Text style={styles.label}>Your Mobile Number</Text>
      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            style={[styles.input, errors.mobileNumber && styles.errorInput]}
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

      <TouchableOpacity
        onPress={handleSubmit(handleSignup)}
        style={styles.signupButton}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {errorMessage ? (
        <View style={styles.messageBox}>
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
        </View>
      ) : null}

      {errors.gender || errors.fullName || errors.mobileNumber ? (
        <View style={styles.messageBox}>
          <Text style={styles.errorMessageText}>
            Please fix the errors above
          </Text>
        </View>
      ) : null}

      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.loginLink}>
          Already on BeingHR? <Text style={{ color: "#0a66c2" }}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 40,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  radioButton: {
    borderWidth: 1,
    width: "48%",
    borderColor: "#0a66c2",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "#ccc",
  },
  radioText: {
    fontSize: 16,
    color: "#0a66c2",
    textAlign: "center",
  },
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 30,
    borderRadius: 5,
  },
  signupButton: {
    backgroundColor: "#0a66c2",
    borderRadius: 7,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 30,
    marginBottom: 100,
    height: 50,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginLink: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    marginTop: -40,
    textAlign: "center",
  },

  blueText: {
    color: "#0a66c2",
    textDecorationLine: "underline",
  },
  messageBox: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  errorMessageText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default SignupScreen;
