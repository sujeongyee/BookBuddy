package book.project.bookbuddy.search;

import java.util.List;

import book.project.bookbuddy.command.PostVO;
import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

public interface SearchService {
  List<RecommendVO> getByKeywords(String[] kwdList, boolean isChecked, String sortBy, String page);
  List<ReviewVO> getByKeywords2(String[] kwdList, boolean isChecked,String sortBy, String page);
  public int getByKeywordsCnt(String[] kwdList, boolean isChecked, String type);
}
