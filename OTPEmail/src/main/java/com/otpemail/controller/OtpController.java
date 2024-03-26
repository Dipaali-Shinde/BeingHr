
package com.otpemail.controller;
import com.otpemail.model.UserEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Random;
import java.util.HashMap;
import java.util.Map;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@RestController
public class OtpController {

    @Autowired
    private JavaMailSender javaMailSender;

    // Map to store email-otp pairs
    private Map<String, String> otpStore = new HashMap<>();
    private Map<String, LocalDateTime> otpExpiration = new ConcurrentHashMap<>();

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOTP(@RequestBody UserEmail otpRequest) {
        try {
            String email = otpRequest.getEmail();
            // Generate OTP
            String otp = generateOTP();
         // Send email
            sendEmail(email, otp);

            // Store the OTP with the email and its expiration time
            otpStore.put(email, otp);
            otpExpiration.put(email, LocalDateTime.now().plusMinutes(1));

            return ResponseEntity.ok("OTP sent successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send OTP");
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOTP(@RequestBody UserEmail otpRequest) {
        try {
            String email = otpRequest.getEmail();
            String otp = otpRequest.getOtp();

            // Retrieve the stored OTP for the email
            String storedOTP = otpStore.get(email);

            // Check if the stored OTP matches the one provided in the request
            if (storedOTP != null && storedOTP.equals(otp)) {
                // Remove the OTP from the store after successful verification
                otpStore.remove(email);
                return ResponseEntity.ok("OTP verified successfully");
            } else {
                return ResponseEntity.badRequest().body("Invalid OTP");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to verify OTP");
        }
    }

    // Generate OTP logic
    private String generateOTP() {
        // Generate a random 6-digit OTP
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000); // Generates a random number between 100000 and 999999
        return String.valueOf(otpValue);
    }

    private void sendEmail(String email, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Your OTP");
            message.setText("Your OTP is: " + otp);

            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send email");
        }
    }
}