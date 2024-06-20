package book.project.bookbuddy.command;

import java.sql.Timestamp;

import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class NotificationVO {
  private Integer ntf_no;
  private Integer receive_user;
  private Integer send_user;
  private String ntf_msg;
  private Timestamp ntf_time;
  private boolean ntf_check;
  private String ntf_type;
  private String post_type;
  private Integer post_no;
  private String post_title;
}
