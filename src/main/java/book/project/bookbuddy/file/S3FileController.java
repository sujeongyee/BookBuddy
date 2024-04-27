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

  // 프로필 이미지 업로드
  @PostMapping("/profile")
  public String uploadProfileImage(@RequestParam("profileImage") MultipartFile file) {
      String profileImage = s3Service.upload(file);
      return profileImage;
  }
  // 프로필 이미지 url get
  @GetMapping("/getProfileUrl")
  public String getProfileUrl(@RequestParam("userId") String id) {
    return s3FileSerivce.getProfileUrl(id);  
  }
  // 추천 게시글 이미지 업로드
  @PostMapping("/rcmImgUrlToFile")
  public String rcmImgUrlToFile(@RequestParam("rcmNo") String rcmNo, @RequestParam("imgUrl") String imgUrl,
                                @RequestParam(value = "uploadFiles", required = false) MultipartFile[] uploadFiles) {
    if (imgUrl == null && uploadFiles == null) {
        return "false";
    }
    // google search로 검색한 이미지 파일화-> s3업로드 -> FILE 테이블에 정보 저장
    if (!imgUrl.equals("") && imgUrl != null) { 
        MultipartFile multipartFile = s3FileSerivce.linkToFile(imgUrl);
        String s3Url = s3Service.upload(multipartFile);
        s3FileSerivce.insertRecommendImg(rcmNo, s3Url);
    }
    // 유저가 첨부한 이미지 s3업로드 후 FILE 테이블에 정보 저장
    if (uploadFiles!=null) { 
        for (MultipartFile file : uploadFiles) {
            String s3Url = s3Service.upload(file);
            s3FileSerivce.insertRecommendImg(rcmNo, s3Url);
        }
    }   
    return "success";  
  }
  //리뷰 게시글 이미지 업로드
  @PostMapping("/rvImgUrlToFile")
  public String rvImgUrlToFile(@RequestParam("rvNo") String rvNo,@RequestParam("imgUrl") String imgUrl,
                               @RequestParam(value = "uploadFiles", required = false) MultipartFile[] uploadFiles){

    if (imgUrl == null && uploadFiles == null) {
      return "false";
    }
    // google search로 검색한 이미지 파일화-> s3업로드 -> file 테이블에 정보 저장
    if(!imgUrl.equals("")&&imgUrl!=null){ 
        MultipartFile multipartFile = s3FileSerivce.linkToFile(imgUrl);
        String s3Url = s3Service.upload(multipartFile);
        s3FileSerivce.insertReviewImg(rvNo, s3Url);
    }
    // 유저가 첨부한 이미지 s3업로드
    if(uploadFiles != null){
        for (MultipartFile file : uploadFiles) {
          String s3Url = s3Service.upload(file);
          s3FileSerivce.insertReviewImg(rvNo, s3Url);
        }
    }   
    return "success";  
  }
  
  

  
  
  




  
}
