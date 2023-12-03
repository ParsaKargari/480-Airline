# ENSF 480 Final Project

## Overview
This project is a collaborative effort of four team members, developed as the final project for the ENSF 480 course. It features a robust application utilizing Java Spring Boot for the backend, MySQL for the database, and React Material UI for the frontend.

## Team Members
- Parsa
- Andrew
- Ben
- Masroor

## Technology Stack
- **Backend:** Java Spring Boot
- **Database:** MySQL
- **Frontend:** JavaScript, React with Material UI

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Java 17
- Maven
- MySQL
- Node.js and npm
- Google email credentials (JSON file)

### Setting Up the Backend
1. **Build the Project:**
   - Navigate to the root directory of the backend project.
   - Run the following command to build the project:
     ```
     mvn clean install
     ```
2. **Configure MySQL:**
   - Ensure that your MySQL server is running.
   - Configure your MySQL connection details in the `application.properties` file located in the `src/main/resources` folder of the backend project.

3. **Add Google Email Credentials:**
   - Place your Google email credentials JSON file in the `src/main/resources` folder.

4. **Run the Backend:**
   - After building the project, navigate to the `target` directory.
   - Run the generated JAR file using:
     ```
     java -jar [jar-file-name].jar
     ```

### Setting Up the Frontend
1. **Install Dependencies:**
   - Navigate to the root directory of the frontend project.
   - Run the following command to install the necessary dependencies:
     ```
     npm install --force
     ```

2. **Start the Frontend Application:**
   - Once the dependencies are installed, start the application using:
     ```
     npm start
     ```

### Email Authorization
- After sending an email from the application, open the backend console.
- Click the website link provided to authorize Google to send an email.

## Usage
- The application comes with pre-initialized data for testing purposes.
- Default credentials for various roles are available as follows:
  - **Admin:**
    - Username: `admin`
    - Password: `adminpass`
  - **User:**
    - Username: `user`
    - Password: `userpass`
  - **Tour Agent:**
    - Username: `touragent`
    - Password: `touragentpass`
  - **Airline Agent:**
    - Username: `airlineagent`
    - Password: `airlineagentpass`
  - **Flight Attendant:**
    - Username: `flightattendant`
    - Password: `flightattendantpass`

- **Making Payments:**
  - When making payments, ensure the credit card details adhere to the following format requirements:
    - **Credit Card Number:** Must be 16 digits without any spaces or separators.
    - **Expiry Date:** Must be in MM/YY format, and the year should be in the future.

  - It is important to adhere to these formatting rules to ensure successful processing of payments within the application.
