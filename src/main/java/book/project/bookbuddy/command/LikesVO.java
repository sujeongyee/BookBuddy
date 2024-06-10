package book.project.bookbuddy.command;



import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class LikesVO {

  private Integer like_no;
  private String like_type;
  private Integer like_postNo;
  private Integer like_user;
  private Timestamp like_time;
  
}
