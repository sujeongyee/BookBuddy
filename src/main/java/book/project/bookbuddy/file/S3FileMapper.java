package book.project.bookbuddy.file;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface S3FileMapper {

  public String getProfileUrl(String id);

}
