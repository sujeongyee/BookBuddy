package book.project.bookbuddy.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.DeleteMapping;
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
  public ResponseEntity<String> uploadProfileImage(@RequestParam("profileImage") MultipartFile file) {
      try {
          String profileImage = s3Service.upload(file);
          return ResponseEntity.ok(profileImage); // 업로드된 파일의 경로나 정보를 반환
      } catch (Exception e) {
          e.printStackTrace();
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 이미지 업로드 실패");
      }
  }
  // 프로필 이미지 삭제
  @DeleteMapping("/profileDelete")
  public ResponseEntity<String> profileDelete(@RequestParam("profileURL") String profileURL) {
      s3Service.deleteImageFromS3(profileURL);
      return ResponseEntity.ok("프로필 이미지 삭제 성공");
  }
  public static class FileDeleteRequest {
    private Integer fileNo;
    private String url;

    // 게터와 세터
    public Integer getFileNo() {
        return fileNo;
    }

    public void setFileNo(Integer fileNo) {
        this.fileNo = fileNo;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
  }
  // 게시글 첨부 이미지 삭제
  @DeleteMapping("/postImgDelete")
  public ResponseEntity<String> postImgDelete(@RequestBody FileDeleteRequest deleteRequest) {
    Integer fileNo = deleteRequest.getFileNo();
    String url = deleteRequest.getUrl();

    s3FileSerivce.deleteFile(fileNo);  
    s3Service.deleteImageFromS3(url);
    return ResponseEntity.ok("프로필 이미지 삭제 성공");
  }
  // 프로필 이미지 url get
  @GetMapping("/getProfileUrl")
  public String getProfileUrl(@RequestParam("userId") String id) {
    return s3FileSerivce.getProfileUrl(id);  
  }
  // 추천 게시글 이미지 업로드
  @PostMapping("/rcmImgUrlToFile")
  public String rcmImgUrlToFile(@RequestParam("rcmNo") String rcmNo, 
                                @RequestParam(value = "uploadFiles", required = false) MultipartFile[] uploadFiles) {
    if (uploadFiles == null) {
        return "false";
    }
    // // google search로 검색한 이미지 파일화-> s3업로드 -> FILE 테이블에 정보 저장
    // if (!imgUrl.equals("") && imgUrl != null) { 
    //     MultipartFile multipartFile = s3FileSerivce.linkToFile(imgUrl);
    //     String s3Url = s3Service.upload(multipartFile);
    //     s3FileSerivce.insertRecommendImg(rcmNo, s3Url);
    // }
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
  public String rvImgUrlToFile(@RequestParam("rvNo") String rvNo,
                               @RequestParam(value = "uploadFiles", required = false) MultipartFile[] uploadFiles){

    if ( uploadFiles == null) {
      return "false";
    }
    // google search로 검색한 이미지 파일화-> s3업로드 -> file 테이블에 정보 저장
    // if(!imgUrl.equals("")&&imgUrl!=null){ 
    //     MultipartFile multipartFile = s3FileSerivce.linkToFile(imgUrl);
    //     String s3Url = s3Service.upload(multipartFile);
    //     s3FileSerivce.insertReviewImg(rvNo, s3Url);
    // }
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
