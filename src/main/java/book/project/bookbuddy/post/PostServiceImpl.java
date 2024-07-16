package book.project.bookbuddy.post;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import book.project.bookbuddy.command.CmtVO;
import book.project.bookbuddy.command.GridVO;
import book.project.bookbuddy.command.LikesVO;
import book.project.bookbuddy.command.ListVO;
import book.project.bookbuddy.command.NotificationVO;
import book.project.bookbuddy.command.PostVO;
import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;
import book.project.bookbuddy.notification.NotificationMapper;
import book.project.bookbuddy.notification.NotificationService;
import book.project.bookbuddy.user.UserMapper;

@Service("postService")
public class PostServiceImpl implements PostService{

  @Autowired
  private PostMapper postMapper;

  @Autowired
  private UserMapper userMapper;

  @Autowired
  private NotificationMapper notificationMapper;

  @Autowired
  @Qualifier("notiService")
  private NotificationService notificationService;

  public List<RecommendVO> getNotLoginRecommend(int page){
    return postMapper.getNotLoginRecommend(page);
  }
  public List<ReviewVO> getNotLoginReview(int page){
    return postMapper.getNotLoginReview(page);
  }

  public int writeRecommendPost(RecommendVO vo){
    return postMapper.writeRecommendPost(vo);
  }

  public int getRecommendNo(int userNo){
    return postMapper.getRecommendNo(userNo);
  }

  public int writeReviewPost(ReviewVO vo){
    return postMapper.writeReviewPost(vo);
  }

  public int getReviewNo(int userNo){
    return postMapper.getReviewNo(userNo);
  }
  public List<RecommendVO> getRcmPostMyPage(String userId){
    return postMapper.getRcmPostMyPage(userId);    
  }
  public List<GridVO>  getRcmPostGrid(String userId){
    return postMapper.getRcmPostGrid(userId);
  }
  public List<ReviewVO> getRvPostMyPage(String userId){
    return postMapper.getRvPostMyPage(userId);
  }
  public List<GridVO> getRvPostGrid(String userId){
    return postMapper.getRvPostGrid(userId);
  }
  public List<ListVO> getMyPageList(String userId,String type){
    return postMapper.getMyPageList(userId, type);
  }

  public RecommendVO getPostRecommend(int postNo){
    return postMapper.getPostRecommend(postNo);
  }
  public ReviewVO getPostReview(int postNo){
    return postMapper.getPostReview(postNo);
  }
  public PostVO getCnt(int postNo,String type){
    return postMapper.getCnt(postNo,type);
  }

  public List<LikesVO> getLikeList(int postNo,String type){
    return postMapper.getLikeList(postNo, type);
  }
  public List<CmtVO> getCmtList(int postNo,String type){
    return postMapper.getCmtList(postNo, type);
  }
  public int likeCheck (int postNo,int userNo,String type) {
    return postMapper.likeCheck(postNo, userNo,type);
  }
  public int doLike(int postNo,int userNo,String type){
    String userNick = userMapper.getUserNick(userNo);
    String msg = userNick+" 버디가 당신의 게시글에 공감했습니다.";
    int user_no = 0;
    String title = "";
    if(type.equals("review")){
      ReviewVO vo = postMapper.getPostsUserNo2(postNo);
      user_no = vo.getUser_NO();
      title = vo.getReview_TITLE();
    }else{
      RecommendVO vo = postMapper.getPostsUserNo(postNo);
      user_no = vo.getUser_NO();
      title = vo.getRecommend_TITLE();
    }
    if(title.length()>10){
      title=title.substring(0, 9);
      title+="...";
    }
    NotificationVO vo = new NotificationVO(null, user_no, userNo, msg, null, false, null,type, postNo,title);
    notificationMapper.sendLikeMessage(vo);
    notificationService.sendNotification(vo);
    postMapper.upLike(postNo, type);
    return postMapper.doLike(postNo, userNo, type);
  }
  public int cancelLike(int postNo,int userNo,String type){
    postMapper.downLike(postNo, type);
    return postMapper.cancelLike(postNo, userNo, type);
  }

  public void comment(int postNo, int userNo, String type, String comment){
    postMapper.comment(postNo, userNo, type, comment);
    String userNick = userMapper.getUserNick(userNo);
    String msg = userNick+" 버디가 당신의 게시글에 댓글을 남겼습니다.";
    int user_no = 0;
    String title = "";
    if(type.equals("review")){
      ReviewVO vo = postMapper.getPostsUserNo2(postNo);
      user_no = vo.getUser_NO();
      title = vo.getReview_TITLE();
    }else{
      RecommendVO vo = postMapper.getPostsUserNo(postNo);
      user_no = vo.getUser_NO();
      title = vo.getRecommend_TITLE();
    }
    if(title.length()>10){
      title=title.substring(0, 9);
      title+="...";
    }
    NotificationVO vo = new NotificationVO(null, user_no, userNo, msg, null, false, null,type, postNo,title);
    notificationService.sendNotification(vo);
    if(comment.length()>15){
      comment = comment.substring(0, 14);
      comment+="...";
    }
    vo.setNtf_msg(vo.getNtf_msg()+"\n : "+comment);
    notificationMapper.sendCommentMessage(vo);
    
    
  }

  public CmtVO geCmtVO(){
    return postMapper.getCmtVO();
  }
  public int modifyRecommendPost(RecommendVO vo){
    return postMapper.modifyRecommendPost(vo);
  }
  public int modifyReviewPost(ReviewVO vo){
    return postMapper.modifyReviewPost(vo);
  }

  public void deletePostComment(int postNo, String type){
    postMapper.deletePostComment(postNo,type);
  }
  public void deletePost(int postNo, String type){
    postMapper.deletePost(postNo, type);
  }
  public void modifyComment(String commentNo, String editContent){
    postMapper.modifyComment(commentNo, editContent);
  }

  public void deleteComment(int commentNo){
    postMapper.deleteComment(commentNo);
  }

  public List<RecommendVO> getLoginRecommend(String userNo, String page) {
    return postMapper.getLoginRecommend(userNo,page);
  }
  public List<ReviewVO> getLoginReview(String userNo, String page){
    return postMapper.getLoginReview(userNo,page);
  }

}
