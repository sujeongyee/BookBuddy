package book.project.bookbuddy.notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import book.project.bookbuddy.command.NotificationVO;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/book/noti")
public class NotificationController {

    @Autowired
    @Qualifier("notiService")
    private NotificationService notiService;

    // 실시간 메세지 보내기
    @MessageMapping("/notify")
    @SendTo("/topic/notifications")
    public NotificationVO notify(NotificationVO notification) {
        return notification;
    }
    // 알림 읽기
    @PostMapping("/readNotification")
    public void readNotification(@RequestParam("ntfNo") String ntfNo) {  
        notiService.readNotification(ntfNo);
    }

    // 모든 알림 일기
    @PostMapping("/readAllNotification")
    public void readAllNotification(@RequestParam("userNo") String userNo) {
        notiService.readAllNotification(userNo);
    }
    
    
    
}