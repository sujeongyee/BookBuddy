package book.project.bookbuddy.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import book.project.bookbuddy.config.NotificationHandler;

@Service
public class NotificationService {

    private final NotificationHandler notificationHandler;

    @Autowired
    public NotificationService(NotificationHandler notificationHandler) {
        this.notificationHandler = notificationHandler;
    }

    public void sendNotification(String message) {
        notificationHandler.sendNotification(message);
    }
}