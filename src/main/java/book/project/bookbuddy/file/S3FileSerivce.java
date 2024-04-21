package book.project.bookbuddy.file;

import org.springframework.web.multipart.MultipartFile;

public interface S3FileSerivce {

  public String getProfileUrl(String id);
  public int insertRecommendImg(String rcm_no,String url);
  public MultipartFile linkToFile(String imgUrl);
  public int insertReviewImg(String rv_no,String url);
}
