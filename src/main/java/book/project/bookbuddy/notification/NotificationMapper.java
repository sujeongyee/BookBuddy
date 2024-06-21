package book.project.bookbuddy.notification;

import org.apache.ibatis.annotations.Mapper;

import book.project.bookbuddy.command.NotificationVO;

@Mapper
public interface NotificationMapper {

  public int sendFollowMessage(NotificationVO vo);
  public int sendLikeMessage(NotificationVO vo);
  public int sendCommentMessage(NotificationVO vo);
  public int readNotification(String ntf_no);
  public void readAllNotification(String userNo);
}
