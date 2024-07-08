package book.project.bookbuddy.search;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import book.project.bookbuddy.command.PostVO;
import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

@Service("SearchService")
public class SearchServiceImpl implements SearchService{

  @Autowired
  private SearchMapper searchMapper;


  public List<RecommendVO> getByKeywords(String kwds){
    return searchMapper.getByKeywords(kwds);
  }
  public List<ReviewVO> getByKeywords2(String kwds){
    return searchMapper.getByKeywords2(kwds);
  }
}
