package book.project.bookbuddy.post;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import book.project.bookbuddy.command.GridVO;
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
}
