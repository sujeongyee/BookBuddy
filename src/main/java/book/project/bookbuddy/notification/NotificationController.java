package book.project.bookbuddy.notification;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import book.project.bookbuddy.command.NotificationVO;
@Controller
public class NotificationController {

    @MessageMapping("/notify")
    @SendTo("/topic/notifications")
    public NotificationVO notify(NotificationVO notification) {
        return notification;
    }
}