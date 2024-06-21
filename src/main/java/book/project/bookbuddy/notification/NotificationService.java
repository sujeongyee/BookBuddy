package book.project.bookbuddy.notification;

import book.project.bookbuddy.command.NotificationVO;

public interface NotificationService {
  public void sendNotification(NotificationVO notification);
  public void readNotification(String notiNo);
  public void readAllNotification(String userNo);
}
