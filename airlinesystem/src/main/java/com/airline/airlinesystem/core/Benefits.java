package com.airline.airlinesystem.core;
import jakarta.persistence.*;

@Entity
public class Benefits {
    @Transient
    private Account account;

    private int id;
    private Boolean freeTicket;
    private News news;
    private Boolean discountedLounge;
    public Benefits(Account account, Boolean freeTicket, News news, Boolean discountedLounge) {
        this.id = account.getId();
        this.account = account;
        this.freeTicket = freeTicket;
        this.news = news;
        this.discountedLounge = discountedLounge;
    }
    public Account getAccount() {
        return account;
    }
    public void setAccount(Account account) {
        this.account = account;
    }
    public Boolean getFreeTicket() {
        return freeTicket;
    }
    public void setFreeTicket(Boolean freeTicket) {
        this.freeTicket = freeTicket;
    }
    public News getNews() {
        return news;
    }
    public void setNews(News news) {
        this.news = news;
    }
    public Boolean getDiscountedLounge() {
        return discountedLounge;
    }
    public void setDiscountedLounge(Boolean discountedLounge) {
        this.discountedLounge = discountedLounge;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    
}
