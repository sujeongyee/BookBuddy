package book.project.bookbuddy.search;

import java.util.List;

import book.project.bookbuddy.command.PostVO;
import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

public interface SearchService {

  public List<RecommendVO> getByKeywords(String kwds);
  public List<ReviewVO> getByKeywords2(String kwds);
}
