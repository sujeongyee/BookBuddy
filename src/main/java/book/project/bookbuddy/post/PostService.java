package book.project.bookbuddy.post;

import java.util.List;

import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

public interface PostService {

  public List<RecommendVO> getNotLoginRecommend(int page);
  public List<ReviewVO> getNotLoginReview(int page);
  public int writeRecommendPost(RecommendVO vo);
  public int getRecommendNo(int userNo);
  public int writeReviewPost(ReviewVO vo);
  public int getReviewNo(int userNo);
}
