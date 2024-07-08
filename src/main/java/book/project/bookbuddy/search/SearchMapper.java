package book.project.bookbuddy.search;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import book.project.bookbuddy.command.PostVO;
import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

@Mapper
public interface SearchMapper {

  public List<RecommendVO> getByKeywords(String kwds);
  public List<ReviewVO> getByKeywords2(String kwds);
  
}
