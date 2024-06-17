package book.project.bookbuddy.file;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import book.project.bookbuddy.command.FileVO;

@Mapper
public interface S3FileMapper {

  public String getProfileUrl(String id);
  public int insertRecommendImg(@Param("rcm_no")String rcm_no,@Param("url")String url);
  public int insertReviewImg(@Param("rv_no")String rv_no,@Param("url")String url);
  public List<FileVO> getPostImgs(@Param("type")String type, @Param("postNo") int postNo);
  public int deleteFile(int fileNo);
}
