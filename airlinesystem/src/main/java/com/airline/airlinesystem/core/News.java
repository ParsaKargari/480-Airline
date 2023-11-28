package com.airline.airlinesystem.core;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class News implements Email {
    private String newsTitle;
    private String newsContent;

    public News(String newsTitle, String newsContent) {
        this.newsTitle = newsTitle;
        this.newsContent = newsContent;
    }

    // Getters and setters...

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    @Override
    public void sendEmail(String to, String subject, String body) {
        // Replace these values with your actual email credentials
        final String username = "your-email@gmail.com";
        final String password = "your-email-password";
        String newsSubject = "News: " + subject;
        String newsBody = "News Content: " + body;

        // Set the properties for the email session
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        // Create a Session instance
        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            // Create a MimeMessage object
            Message message = new MimeMessage(session);

            // Set the sender address
            message.setFrom(new InternetAddress(username));

            // Set the recipient address
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));

            // Set the email subject and body
            message.setSubject(newsSubject);
            message.setText(newsBody);

            // Send the email
            Transport.send(message);

            System.out.println("Email sent successfully!");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
