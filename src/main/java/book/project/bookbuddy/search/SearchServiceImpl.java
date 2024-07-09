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


  public List<RecommendVO> getByKeywords(String[] kwdList, boolean isChecked, String sortBy, String page){
    return searchMapper.getByKeywords(kwdList,isChecked,sortBy,page);
  }
  public List<ReviewVO> getByKeywords2(String[] kwdList, boolean isChecked,String sortBy, String page){
    return searchMapper.getByKeywords2(kwdList,isChecked,sortBy,page);
  }
  public int getByKeywordsCnt(String[] kwdList, boolean isChecked,String type){
    if(type.equals("recommend")){
      return searchMapper.getByKeywordsRcmCnt(kwdList, isChecked);
    }else{
      return searchMapper.getByKeywordsRvCnt(kwdList, isChecked);
    }
  }
}
