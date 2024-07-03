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
public class RecommendVO { // 추천게시글 vo
  private int recommend_NO;
  private String recommend_TITLE;
  private String recommend_CONTENT;
  private Timestamp recommend_TIME;
  private String recommend_CATEGORY;
  private String recommend_CATEGORY2;
  private String recommend_KEYWORD;
  private String recommend_KEYWORD2;
  private int recommend_LIKE;
  private int user_NO;
  private String recommend_BOOKTITLE;
  private String book_ISBN;
  private String book_THUMBNAIL;
  private Integer cmtCnt;
  private Integer likeCnt;
  private String fileUrl;
  private String user_NICK;
  private String profile_URL;
}
