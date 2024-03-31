package book.project.bookbuddy.main;

import book.project.bookbuddy.command.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MainMapper {
    public int checkUser(UserVO vo);
}
