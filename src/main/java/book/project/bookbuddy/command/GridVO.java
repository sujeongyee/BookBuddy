package book.project.bookbuddy.command;



import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GridVO {

  private Integer recommend_no;
  private String recommend_title;
  private String recommend_content;
  private Timestamp recommend_time;
  private String recommend_booktitle;
  private Integer file_no;
  private String file_url;
  
}
