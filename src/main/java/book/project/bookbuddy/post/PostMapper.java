package book.project.bookbuddy.post;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

@Mapper
public interface PostMapper {
  public List<RecommendVO> getNotLoginRecommend(int page);
  public List<ReviewVO> getNotLoginReview(int page);
  public int writeRecommendPost(RecommendVO vo);
  public int getRecommendNo(int userNo);
}
