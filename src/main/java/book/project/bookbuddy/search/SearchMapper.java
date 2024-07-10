package book.project.bookbuddy.search;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import book.project.bookbuddy.command.PostVO;
import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

@Mapper
public interface SearchMapper {

  public List<RecommendVO> getByKeywords(@Param("kwdList") String[] kwdList, @Param("isChecked") boolean isChecked, @Param("sortBy") String sortBy, @Param("page") String page);
  public List<ReviewVO> getByKeywords2(@Param("kwdList") String[] kwdList, @Param("isChecked") boolean isChecked, @Param("sortBy") String sortBy ,@Param("page") String page);
  public int getByKeywordsRvCnt(@Param("kwdList") String[] kwdList,  @Param("isChecked") boolean isChecked);
  public int getByKeywordsRcmCnt(@Param("kwdList") String[] kwdList,  @Param("isChecked") boolean isChecked);
  public List<RecommendVO> getByCategories(@Param("cateList") String[] cateList, @Param("isChecked") boolean isChecked, @Param("sortBy") String sortBy, @Param("page") String page);
  public List<ReviewVO> getByCategories2(@Param("cateList") String[] cateList, @Param("isChecked") boolean isChecked, @Param("sortBy") String sortBy ,@Param("page") String page);
  public int getByCategoriesRvCnt(@Param("cateList") String[] cateList,  @Param("isChecked") boolean isChecked);
  public int getByCategoriesRcmCnt(@Param("cateList") String[] cateList,  @Param("isChecked") boolean isChecked);

}
