package book.project.bookbuddy.command;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReviewVO { // 리뷰게시글 vo

  private int review_NO;
  private String review_TITLE;
  private String review_CONTENT;
  private Timestamp review_TIME;
  private String review_CATEGORY;
  private String review_CATEGORY2;
  private String review_KEYWORD;
  private String review_KEYWORD2;
  private int review_LIKE;
  private int user_NO;
  private String review_BOOKTITLE;
  private int review_RATING;
  private String book_ISBN;
  private String book_THUMBNAIL;
  private Integer cmtCnt;
  private Integer likeCnt;
  private String fileUrl;
  private String user_NICK;
  private String profile_URL;
}
