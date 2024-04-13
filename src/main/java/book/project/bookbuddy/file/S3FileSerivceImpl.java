package book.project.bookbuddy.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("s3fileService")
public class S3FileSerivceImpl implements S3FileSerivce {

  @Autowired
  private S3FileMapper s3FileMapper;

  public String getProfileUrl(String id){
    return s3FileMapper.getProfileUrl(id);
  }
  
}
