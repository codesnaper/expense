package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationDao extends JpaRepository<Notification, Long> {

    List<Notification> findByUserId(String userId);

    Optional<Notification> findByUserIdAndId(String userId, long id);

    int countByUserIdAndIsUnread(String userId, boolean isUnread);
}
