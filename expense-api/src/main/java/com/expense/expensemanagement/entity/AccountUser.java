package com.expense.expensemanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="em_account_user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountUser {

    //id,firstName,lastName,email,gender,contactNo,country,dob
    @Id
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name="FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastname;

    @Column(name="EMAIL")
    private String email;

    @Column(name = "GENDER")
    private String gender;

    @Column(name="CONTACT")
    private String contactNo;

    @Column(name="COUNTRY")
    private String country;

    @Column(name = "DOB")
    private String dob;


}
