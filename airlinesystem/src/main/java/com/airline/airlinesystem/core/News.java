package com.airline.airlinesystem.core;

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
        // Implement email sending logic here
        System.out.println("Sending news email to: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("News Title: " + newsTitle);
        System.out.println("News Content: " + newsContent);
        System.out.println("Email sent successfully!");
    }
}
