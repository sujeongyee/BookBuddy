package book.project.bookbuddy.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import book.project.bookbuddy.command.FollowerVO;
import book.project.bookbuddy.command.NotificationVO;
import book.project.bookbuddy.command.UserVO;
import book.project.bookbuddy.notification.NotificationMapper;
import book.project.bookbuddy.notification.NotificationService;

@Service("userService")
public class UserServiceImpl implements UserService{

  @Autowired
  private UserMapper userMapper;

  @Autowired
  private NotificationMapper notificationMapper;

  @Autowired
  @Qualifier("notiService")
  private NotificationService notificationService;

  public int updateProfile(UserVO vo){
    return userMapper.updateProfile(vo);
  }

  public int getRecommendPostCount(String userId){
    return userMapper.getRecommendPostCount(userId);
  }
  public int getReviewPostCount(String userId){
    return userMapper.getReviewPostCount(userId);
  }

  public FollowerVO getFollow(int userNO){
    return userMapper.getFollow(userNO);
  }

  public int getUserNo(String userId){
    return userMapper.getUserNo(userId);
  }

  public List<UserVO> getFollowerList(int userNo){
    return userMapper.getFollowerList(userNo);
  }
  public List<UserVO> getFollowingList(int userNo){
    return userMapper.getFollowingList(userNo);
  }
  public List<UserVO> getFollowerList2(int feedNo,int userNo){
    return userMapper.getFollowerList2(feedNo, userNo);
  }
  public List<UserVO> getFollowingList2(int feedNo,int userNo){
    return userMapper.getFollowingList2(feedNo, userNo);
  }

  public int addFollow(int userNo, int toUserNo){
    String userNick = userMapper.getUserNick(userNo);
    String msg = userNick+" 버디가 당신을 팔로우 했습니다.";
    NotificationVO vo = new NotificationVO(null, toUserNo, userNo, msg, null, false, null, null, null,null);
    notificationMapper.sendFollowMessage(vo);
    // 실시간 알림 메세지 보내기
    notificationService.sendNotification(vo);
    return userMapper.addFollow(userNo, toUserNo);
  }
  public int cancelFollow(int userNo, int toUserNo){
    return userMapper.cancelFollow(userNo, toUserNo);
  }
  public int checkFollow(int userId,int toUserNo){
    return userMapper.checkFollow(userId, toUserNo);
  }
  public int getUnReadNotification(String userNo){
    return userMapper.getUnReadNotification(userNo);
  }
}
