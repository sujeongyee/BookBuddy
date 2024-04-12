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
public class ReviewVO {

  private int REVIEW_NO;
  private String REVIEW_TITLE;
  private String REVIEW_CONTENT;
  private Timestamp REVIEW_TIME;
  private String REVIEW_CATEGORY;
  private String REVIEW_KEYWORD;
  private int REVIEW_LIKE;
  private int USER_NO;

}
