package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationDao extends JpaRepository<Notification, Long> {
}
