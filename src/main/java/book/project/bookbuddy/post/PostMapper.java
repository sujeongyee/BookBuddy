package book.project.bookbuddy.post;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import book.project.bookbuddy.command.CmtVO;
import book.project.bookbuddy.command.GridVO;
import book.project.bookbuddy.command.LikesVO;
import book.project.bookbuddy.command.ListVO;
import book.project.bookbuddy.command.PostVO;
import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

@Mapper
public interface PostMapper {
  public List<RecommendVO> getNotLoginRecommend(int page);
  public List<ReviewVO> getNotLoginReview(int page);
  public int writeRecommendPost(RecommendVO vo);
  public int getRecommendNo(int userNo);
  public int writeReviewPost(ReviewVO vo);
  public int getReviewNo(int userNo);
  public List<RecommendVO> getRcmPostMyPage(String userId);
  public List<GridVO>  getRcmPostGrid(String userId);
  public List<ReviewVO> getRvPostMyPage(String userId);
  public List<GridVO> getRvPostGrid(String userId);
  public List<ListVO> getMyPageList(@Param("userId")String userId,@Param("type")String type);
  public RecommendVO getPostRecommend(int postNo);
  public ReviewVO getPostReview(int postNo);
  public PostVO getCnt(@Param("postNo")int postNo,@Param("type")String type);
  public List<LikesVO> getLikeList(@Param("postNo")int postNo,@Param("type")String type);
  public List<CmtVO> getCmtList(@Param("postNo")int postNo,@Param("type")String type);
}
