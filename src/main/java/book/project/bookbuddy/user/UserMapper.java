package book.project.bookbuddy.user;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import book.project.bookbuddy.command.FollowerVO;
import book.project.bookbuddy.command.UserVO;

@Mapper
public interface UserMapper {

  public int updateProfile(UserVO vo);
  public int getRecommendPostCount(String userId);
  public int getReviewPostCount(String userId);
  public FollowerVO getFollow(int userNO);
  public int getUserNo(String userId);
  public String getUserNick(int userNo);
  public List<UserVO> getFollowerList(int userNo);
  public List<UserVO> getFollowingList(int userNo);
  public List<UserVO> getFollowerList2(@Param("feedNo")int feedNo,@Param("userNo")int userNo);
  public List<UserVO> getFollowingList2(@Param("feedNo")int feedNo,@Param("userNo")int userNo);
  public int addFollow(@Param("userNo") int userNo, @Param("toUserNo") int toUserNo);
  public int cancelFollow(@Param("userNo") int userNo, @Param("toUserNo") int toUserNo);
  public int checkFollow(@Param("userId")int userId,@Param("toUserNo") int toUserNo);
  public int getUnReadNotification(String userNo);
}
