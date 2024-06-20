package book.project.bookbuddy.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import book.project.bookbuddy.command.NotificationVO;

@Service
public class NotificationService {

    private final NotificationMapper notificationMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NotificationService(NotificationMapper notificationMapper, SimpMessagingTemplate messagingTemplate) {
        this.notificationMapper = notificationMapper;
        this.messagingTemplate = messagingTemplate;
    }

    public void sendFollowNotification(NotificationVO notification) {
        messagingTemplate.convertAndSend("/topic/notifications", notification);
    }
}