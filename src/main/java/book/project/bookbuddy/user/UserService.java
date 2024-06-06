package book.project.bookbuddy.user;

import java.util.List;

import book.project.bookbuddy.command.FollowerVO;
import book.project.bookbuddy.command.UserVO;

public interface UserService {
  public int updateProfile(UserVO vo);
  public int getRecommendPostCount(String userId);
  public int getReviewPostCount(String userId);
  public FollowerVO getFollow(int userNO);
  public int getUserNo(String userId);
  public List<UserVO> getFollowerList(int userNo);
  public List<UserVO> getFollowingList(int userNo);
}
