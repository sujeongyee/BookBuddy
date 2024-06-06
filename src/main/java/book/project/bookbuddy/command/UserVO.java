package book.project.bookbuddy.command;

import lombok.*;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class UserVO { // 유저 vo

    private Integer user_NO;
    private String user_ID;
    private String user_PWD;
    private String user_NICK;
    private String user_PHONE;
    private Timestamp user_BIRTH;
    private String category_NO;
    private String keyword_NO;
    private String user_EMAIL;
    private String profile_URL;
    private boolean check_following;

}
