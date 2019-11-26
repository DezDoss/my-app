package kz.ivc.mysql.Model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "company")
@Data
public class Company {
    public Company() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private int price;

    @Column(name = "change")
    private int change;

    @Column(name = "pctchange")
    private int pctChange;

    @Column(name = "lastchange")
    private Date lastChange;
}
