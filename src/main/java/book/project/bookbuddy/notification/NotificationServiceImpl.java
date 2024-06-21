package book.project.bookbuddy.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import book.project.bookbuddy.command.NotificationVO;

@Service("notiService")
public class NotificationServiceImpl implements NotificationService{

    //private final NotificationMapper notificationMapper;
    private final SimpMessagingTemplate messagingTemplate;
    @Autowired
    private NotificationMapper notificationMapper;
    @Autowired
    public NotificationServiceImpl(NotificationMapper notificationMapper, SimpMessagingTemplate messagingTemplate) {
        this.notificationMapper = notificationMapper;
        this.messagingTemplate = messagingTemplate;
    }

    public void sendNotification(NotificationVO notification) {
        messagingTemplate.convertAndSend("/topic/notifications", notification);
    }

    public void readNotification(String notiNo){
        notificationMapper.readNotification(notiNo);
    }

    public void readAllNotification(String userNo){
        notificationMapper.readAllNotification(userNo);
    }
}