package book.project.bookbuddy.file;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import book.project.bookbuddy.command.FileVO;

public interface S3FileSerivce {

  public String getProfileUrl(String id);
  public int insertRecommendImg(String rcm_no,String url);
  public MultipartFile linkToFile(String imgUrl);
  public int insertReviewImg(String rv_no,String url);
  public List<FileVO> getPostImgs(String type,int postNo);
  public int deleteFile(int fileNo);
}
