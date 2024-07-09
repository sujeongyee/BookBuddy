package book.project.bookbuddy.search;

import java.util.List;

import book.project.bookbuddy.command.PostVO;
import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

public interface SearchService {
  List<RecommendVO> getByKeywords(String[] kwdList, boolean isChecked);
  List<ReviewVO> getByKeywords2(String[] kwdList, boolean isChecked);
}
