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
  public int likeCheck (@Param("postNo")int postNo,@Param("userNo") int userNo,@Param("type")String type);
  public int doLike(@Param("postNo")int postNo,@Param("userNo") int userNo,@Param("type")String type);
  public void upLike(@Param("postNo")int postNo,@Param("type")String type);
  public int cancelLike(@Param("postNo")int postNo,@Param("userNo") int userNo,@Param("type")String type);
  public void downLike(@Param("postNo")int postNo,@Param("type")String type);
  public void comment(@Param("postNo")int postNo,@Param("userNo") int userNo,@Param("type")String type,@Param("comment") String comment);
  public CmtVO getCmtVO();
  public int modifyRecommendPost(RecommendVO vo);
  public int modifyReviewPost(ReviewVO vo);
  public void deletePostComment(@Param("postNo")int postNo,@Param("type") String type);
  public void deletePost(@Param("postNo")int postNo,@Param("type") String type);
  public void modifyComment(@Param("commentNo")String commentNo, @Param("editContent")String editContent);
  public void deleteComment(int commentNo);
  public RecommendVO getPostsUserNo(int postNo);
  public ReviewVO getPostsUserNo2(int postNo);
  public List<RecommendVO> getLoginRecommend(@Param("userNo") String userNo, @Param("page") String page);
  public List<ReviewVO> getLoginReview(@Param("userNo") String userNo, @Param("page") String page);
}
