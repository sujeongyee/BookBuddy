package book.project.bookbuddy.main;

import java.sql.Timestamp;
import java.util.List;

import book.project.bookbuddy.command.CategoryVO;
import book.project.bookbuddy.command.KeywordVO;
import book.project.bookbuddy.command.NotificationVO;
import book.project.bookbuddy.command.UserVO;

public interface MainService {
    public boolean checkUser(UserVO vo, String user_pwd);
    public List<CategoryVO> getAllCategories();
    public List<KeywordVO> getAllKeywords();
    public int checkDuplicateId(String id);
    public int checkDuplicateNick(String id);
    public Timestamp getTimeStamp(String time);
    public int joinBuddy(UserVO vo);
    public UserVO getVO(String id);
    public List<NotificationVO> getNoti(String userNo);

}
