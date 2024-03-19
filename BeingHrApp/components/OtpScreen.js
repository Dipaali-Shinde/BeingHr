import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const OtpScreen = ({ route, navigation }) => {
  const mobileNumber = route?.params?.mobileNumber || "";
  const [generatedOtp, setGeneratedOtp] = useState(generateRandomOtp());
  const [displayedOtp, setDisplayedOtp] = useState("");
  const [timer, setTimer] = useState(20); // Set initial timer to 20 seconds
  const [resendText, setResendText] = useState(
    "Didn't get the OTP? Retry in 20s"
  );

  function generateRandomOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          setDisplayedOtp(generatedOtp);
          setResendText("Resend OTP");
          clearInterval(interval);
        }
        return prevTimer - 1;
      });
    }, 300);

    return interval;
  };

  useEffect(() => {
    const interval = startTimer();

    return () => clearInterval(interval);
  }, [generatedOtp]);

  const handleResendOTP = () => {
    if (timer === 0) {
      // Check if the timer has reached 0, meaning it's time to resend OTP
      const newOtp = generateRandomOtp(); // Generate a new OTP
      setGeneratedOtp(newOtp); // Set the new OTP to the generatedOtp state
      setTimer(20); // Reset the timer to 20 seconds

      // Update the resend text to indicate retrying
      setResendText("Retrying...");

      // After 20 seconds, reset the resend text back to the original text
      setTimeout(() => {
        setResendText("Retry in 20s");
      }, 20000);

      // Update displayedOtp with the new OTP
      setDisplayedOtp(newOtp);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>
        {"\n"}Enter the OTP sent to{" +91 "}
        <Text style={{ fontWeight: "bold" }}>{mobileNumber}</Text>
      </Text>

      <View style={styles.otpContainer}>
        {displayedOtp.split("").map((digit, index) => (
          <View
            key={index}
            style={[styles.otpDigitContainer, { marginRight: 3.77953 }]}
          >
            <Text style={styles.otpDigit}>{digit}</Text>
          </View>
        ))}
      </View>
      <View style={styles.lineContainer} />
      <TouchableOpacity
        style={[
          styles.verifyButton,
          { backgroundColor: timer >= 0 ? "#ccc" : "#0a66c2" },
        ]}
        onPress={() => {
          if (timer !== 0) {
            navigation.navigate("HomeScreen");
          }
        }}
        disabled={timer === 0}
      >
        <Text style={styles.verifyButtonText}>Verify and Proceed</Text>
      </TouchableOpacity>

      <Text style={styles.retryText} onPress={handleResendOTP}>
        {resendText}
      </Text>

      <TouchableOpacity
        onPress={handleResendOTP}
        style={styles.resendText}
        disabled={timer !== 0}
      ></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  subHeading: {
    marginTop: 30,
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 50,
    marginTop: 30,
    marginBottom: 10,
  },
  otpDigitContainer: {
    flex: 1,
    alignItems: "center",
  },
  otpDigit: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  lineContainer: {
    width: "100%",
    height: 2,
    backgroundColor: "#000",
    marginBottom: 10,
  },
  verifyButton: {
    borderRadius: 7,
    width: 350,
    paddingVertical: 12,
    marginTop: 70,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  retryText: {
    color: "#0a66c2",
    marginTop: 20,
  },
  resendText: {
    marginTop: 10,
  },
  resendOtpText: {
    color: "#0a66c2",
    textDecorationLine: "underline",
  },
  logInText: {
    flexDirection: "row",
    marginTop: 200,
  },
  logInBlackText: {
    color: "#000",
  },
  logInPurpleText: {
    color: "#0a66c2",
  },
});

export default OtpScreen;
