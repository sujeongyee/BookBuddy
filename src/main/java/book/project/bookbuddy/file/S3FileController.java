package book.project.bookbuddy.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PostMapping;
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
  




  
}
