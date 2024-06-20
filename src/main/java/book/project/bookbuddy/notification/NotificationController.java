package book.project.bookbuddy.notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import book.project.bookbuddy.command.NotificationVO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/book/noti")
public class NotificationController {

    @Autowired
    @Qualifier("notiService")
    private NotificationService notiService;

    @MessageMapping("/notify")
    @SendTo("/topic/notifications")
    public NotificationVO notify(NotificationVO notification) {
        return notification;
    }

    @PostMapping("/readNotification")
    public void readNotification(@RequestParam("ntfNo") String ntfNo) {  
        notiService.readNotification(ntfNo);
    }
    
    
}