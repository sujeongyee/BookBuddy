package book.project.bookbuddy.file;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/book/file/")
public class S3FileController {


  @Autowired
  @Qualifier("s3fileService")
  private S3FileSerivce s3FileSerivce;

  @Autowired
  @Qualifier("s3Service")
  private S3Service s3Service;

  @PostMapping("/profile")
  public String uploadProfileImage(@RequestParam("profileImage") MultipartFile file) {
      System.out.println(file.getOriginalFilename());
      String profileImage = s3Service.upload(file);
      return profileImage;
  }

  @GetMapping("/getProfileUrl")
  public String getProfileUrl(@RequestParam("userId") String id) {
    return s3FileSerivce.getProfileUrl(id);  
  }

  @PostMapping("/rcmImgUrlToFile")
  public String rcmImgUrlToFile(@RequestParam("rcmNo") String rcmNo, @RequestParam("imgUrl") String imgUrl,
                              @RequestParam("uploadFiles") MultipartFile[] uploadFiles) {
    if (imgUrl == null && uploadFiles.length == 0) {
        return "false";
    }

    if (!imgUrl.equals("") && imgUrl != null) {
        System.out.println(imgUrl);
        MultipartFile multipartFile = s3FileSerivce.linkToFile(imgUrl);
        // S3에 업로드
        String s3Url = s3Service.upload(multipartFile);
        // FILE 테이블에 정보 저장
        s3FileSerivce.insertRecommendImg(rcmNo, s3Url);
    }
    
    if (uploadFiles.length > 0) {
        for (MultipartFile file : uploadFiles) {
          System.out.println(file.getOriginalFilename());
            String s3Url = s3Service.upload(file);
            s3FileSerivce.insertRecommendImg(rcmNo, s3Url);
        }
    }   
    return "success";  
  }

  @PostMapping("/rvImgUrlToFile")
  public String rvImgUrlToFile(@RequestParam("rvNo") String rvNo,@RequestParam("imgUrl") String imgUrl,
                                @RequestParam("uploadFiles") MultipartFile[] uploadFiles){

    if (imgUrl == null && uploadFiles.length == 0) {
      return "false";
    }
    if(!imgUrl.equals("")&&imgUrl!=null){
        MultipartFile multipartFile = s3FileSerivce.linkToFile(imgUrl);
        // S3에 업로드
        String s3Url = s3Service.upload(multipartFile);
        s3FileSerivce.insertReviewImg(rvNo, s3Url);
    }
    if(uploadFiles.length>0){
        for (MultipartFile file : uploadFiles) {
          String s3Url = s3Service.upload(file);
          s3FileSerivce.insertReviewImg(rvNo, s3Url);
        }
    }   
    return "success";  
  }
  
  

  
  
  




  
}
