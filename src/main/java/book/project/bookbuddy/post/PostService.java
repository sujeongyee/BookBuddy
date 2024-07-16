package book.project.bookbuddy.post;

import java.util.List;
import java.util.Map;

import book.project.bookbuddy.command.CmtVO;
import book.project.bookbuddy.command.GridVO;
import book.project.bookbuddy.command.LikesVO;
import book.project.bookbuddy.command.ListVO;
import book.project.bookbuddy.command.PostVO;
import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

public interface PostService {

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
  public List<ListVO> getMyPageList(String userId,String type);
  public RecommendVO getPostRecommend(int postNo);
  public ReviewVO getPostReview(int postNo);
  public PostVO getCnt(int postNo,String type);
  public List<LikesVO> getLikeList(int postNo,String type);
  public List<CmtVO> getCmtList(int postNo,String type);
  public int likeCheck (int postNo,int userNo,String type);
  public int doLike(int postNo,int userNo,String type);
  public int cancelLike(int postNo,int userNo,String type);
  public void comment(int postNo, int userNo, String type, String comment);
  public CmtVO geCmtVO();
  public int modifyRecommendPost(RecommendVO vo);
  public int modifyReviewPost(ReviewVO vo);
  public void deletePostComment(int postNo, String type);
  public void deletePost(int postNo, String type);
  public void modifyComment(String commentNo, String editContent);
  public void deleteComment(int commentNo);
  public List<RecommendVO> getLoginRecommend(String userNo,String page);
  public List<ReviewVO> getLoginReview(String userNo,String page);
}
