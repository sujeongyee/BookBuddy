package book.project.bookbuddy.notification;

import book.project.bookbuddy.command.NotificationVO;

public interface NotificationService {
  public void sendFollowNotification(NotificationVO notification);
  public void readNotification(String notiNo);
}
