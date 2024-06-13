package book.project.bookbuddy.file;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Component
public class S3Service {

  private final AmazonS3 amazonS3;

  @Value("${cloud.aws.s3.bucketName}")
  private String bucketName;
  
  public String upload(MultipartFile image) {
    if(image.isEmpty() || Objects.isNull(image.getOriginalFilename())){
      System.out.println("ErrorCode.EMPTY_FILE_EXCEPTION");
    }
    try {
      return this.uploadImageToS3(image);
    } catch (IOException e) {
      return "ErrorCode.IO_EXCEPTION_ON_IMAGE_UPLOAD";
    }
  }


  private String uploadImageToS3(MultipartFile image) throws IOException {
    String originalFilename = image.getOriginalFilename(); //원본 파일 명
    String extention = originalFilename.substring(originalFilename.lastIndexOf(".")); //확장자 명

    String s3FileName = UUID.randomUUID().toString().substring(0, 10) + extention; //변경된 파일 명
    InputStream is = image.getInputStream();
    byte[] bytes = IOUtils.toByteArray(is);

    ObjectMetadata metadata = new ObjectMetadata();
    metadata.setContentType("image/" + extention);
    metadata.setContentLength(bytes.length);
    ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

    try{
      PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3FileName, byteArrayInputStream, metadata);
      amazonS3.putObject(putObjectRequest); // put image to S3
    }catch (Exception e){
      System.out.println("Error while putting object to S3: " + e.getMessage());
    }finally {
      byteArrayInputStream.close();
      is.close();
    }

    return amazonS3.getUrl(bucketName, s3FileName).toString();
  }

  public void deleteImageFromS3(String imageAddress){
    String key = getKeyFromImageAddress(imageAddress);
    try{
      amazonS3.deleteObject(new DeleteObjectRequest(bucketName, key));
    }catch (Exception e){
      System.out.println("ErrorCode.IO_EXCEPTION_ON_IMAGE_DELETE");
    }
  }

  private String getKeyFromImageAddress(String imageAddress){
    try{
      URL url = new URL(imageAddress);
      String decodingKey = URLDecoder.decode(url.getPath(), "UTF-8");
      return decodingKey.substring(1); // 맨 앞의 '/' 제거
    }catch (MalformedURLException | UnsupportedEncodingException e){
      return "ErrorCode.IO_EXCEPTION_ON_IMAGE_DELETE";
    }
  }
  
}
