package book.project.bookbuddy.file;

public interface S3FileSerivce {

  public String getProfileUrl(String id);
  public int insertRecommendImg(String rcm_no,String url);
}
