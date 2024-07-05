package book.project.bookbuddy.main;


import java.util.List;

import book.project.bookbuddy.command.UserVO;
import org.apache.ibatis.annotations.Mapper;

import book.project.bookbuddy.command.CategoryVO;
import book.project.bookbuddy.command.KeywordVO;
import book.project.bookbuddy.command.NotificationVO;

@Mapper
public interface MainMapper {
    public List<CategoryVO> getAllCategories();
    public List<KeywordVO> getAllKeywords();
    public int checkDuplicateId(String id);
    public int checkDuplicateNick(String id);
    public int joinBuddy(UserVO vo);
    public UserVO getVO(String id);
    public List<NotificationVO> getNoti(String userNo);

}
