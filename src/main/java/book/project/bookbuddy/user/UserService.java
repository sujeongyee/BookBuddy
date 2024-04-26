package book.project.bookbuddy.user;

import book.project.bookbuddy.command.UserVO;

public interface UserService {
  public int updateProfile(UserVO vo);
  public int getRecommendPostCount(String userId);
  public int getReviewPostCount(String userId);
}
