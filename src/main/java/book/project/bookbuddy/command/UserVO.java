package book.project.bookbuddy.command;

import lombok.*;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class UserVO {

    private int USER_NO;
    private String USER_ID;
    private String USER_PWD;
    private String USER_NICK;
    private String USER_PHONE;
    private Timestamp USER_BIRTH;
    private String CATEGORY_NO;
    private String KEYWORD_NO;
    private String USER_EMAIL;
    private String PROFILE_URL;


}
