package book.project.bookbuddy.user;

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
  
}
