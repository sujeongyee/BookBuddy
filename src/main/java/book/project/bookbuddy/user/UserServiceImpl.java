package book.project.bookbuddy.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import book.project.bookbuddy.command.FollowerVO;
import book.project.bookbuddy.command.UserVO;

@Service("userService")
public class UserServiceImpl implements UserService{

  @Autowired
  private UserMapper userMapper;

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

  public int addFollow(int userNo, int toUserNo){
    return userMapper.addFollow(userNo, toUserNo);
  }
  public int cancelFollow(int userNo, int toUserNo){
    return userMapper.cancelFollow(userNo, toUserNo);
  }
}
