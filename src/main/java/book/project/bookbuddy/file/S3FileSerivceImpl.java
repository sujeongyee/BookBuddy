package book.project.bookbuddy.file;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import book.project.bookbuddy.command.FileVO;

@Service("s3fileService")
public class S3FileSerivceImpl implements S3FileSerivce {

  @Autowired
  private S3FileMapper s3FileMapper;


  public String getProfileUrl(String id){
    return s3FileMapper.getProfileUrl(id);
  }
  public int insertRecommendImg(String rcm_no,String url){
    return s3FileMapper.insertRecommendImg(rcm_no,url);
  }
  public int insertReviewImg(String rv_no,String url){
    return s3FileMapper.insertReviewImg(rv_no, url);
  }

  public List<FileVO> getPostImgs(String type,int postNo){
    return s3FileMapper.getPostImgs(type, postNo);
  }
  
  public MultipartFile linkToFile(String imgUrl){
    try {
      // 이미지 다운로드
      InputStream in = new URL(imgUrl).openStream();
      ByteArrayOutputStream out = new ByteArrayOutputStream();
      StreamUtils.copy(in, out);

      // 다운로드된 이미지를 파일로 저장
      byte[] imageBytes = out.toByteArray();
      File imageFile = new File("downloaded_image.jpg");
      FileOutputStream fileOutputStream = new FileOutputStream(imageFile);
      fileOutputStream.write(imageBytes);
      fileOutputStream.close();

      // 파일을 멀티파트 파일로 변환하여 S3에 업로드
      MultipartFile multipartFile = new MultipartFile() {
          @Override
          public String getName() {
              return "uploaded_image.jpg";
          }
          @Override
          public String getOriginalFilename() {
              return "uploaded_image.jpg";
          }
          @Override
          public String getContentType() {
              return "image/jpeg";
          }
          @Override
          public boolean isEmpty() {
              return imageBytes.length == 0;
          }
          @Override
          public long getSize() {
              return imageBytes.length;
          }
          @Override
          public byte[] getBytes() throws IOException {
              return imageBytes;
          }
          @Override
          public InputStream getInputStream() throws IOException {
              return new ByteArrayInputStream(imageBytes);
          }
          @Override
          public void transferTo(File dest) throws IOException, IllegalStateException {
              new FileOutputStream(dest).write(imageBytes);
          }
      };
      // 임시 파일 삭제
      imageFile.delete();
      return multipartFile;
      
    } catch (IOException e) {
        e.printStackTrace();
    }
    return null;
  
  }

  public int deleteFile(int fileNo){
    return s3FileMapper.deleteFile(fileNo);
  }
  
}
