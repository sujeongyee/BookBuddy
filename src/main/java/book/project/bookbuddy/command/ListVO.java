package book.project.bookbuddy.command;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ListVO {

  private Integer recommend_NO;
  private Integer review_NO;
  private String recommend_TITLE;
  private String review_TITLE;
  private String recommend_BOOKTITLE;
  private String review_BOOKTITLE;
  private String recommend_CONTENT;
  private String review_CONTENT;
  private String book_thumbnail;
  private Timestamp recommend_TIME;
  private Timestamp review_TIME;
  private Integer likeCnt;
  private Integer cmtCnt;
  private String fileUrl;
  
}
