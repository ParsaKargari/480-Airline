package com.airline.airlinesystem.core;

public class CreditCardApplication {
    private int creditScore;
    private String sin;
    private Login login;
    private Account account;
    private CreditCard creditCard;

    public CreditCardApplication(Account userAccount, int creditScore, String sin) {
        this.account = userAccount;
        this.login = userAccount.getLogin();
        this.sin = sin;
        this.creditScore = creditScore;
    }

    public int getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(int creditScore) {
        this.creditScore = creditScore;
    }

    public String getSin() {
        return sin;
    }

    public void setSin(String sin) {
        this.sin = sin;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public CreditCard getCreditCard() {
        return creditCard;
    }

    public void setCreditCard(CreditCard creditCard) {
        this.creditCard = creditCard;
    }

    public Boolean processApplication() {
        if (creditScore > 700 && account.getCreditCard() == null && sin != null) {
            this.creditCard = new CreditCard(account.getName(), account.getName());
            this.account.setCreditCard(creditCard);
            return true;
        }
        return false;
    }
}
