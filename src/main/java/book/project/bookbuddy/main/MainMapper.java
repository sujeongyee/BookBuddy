package book.project.bookbuddy.main;

import book.project.bookbuddy.command.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MainMapper {
    public int checkUser(@Param("user_id") String user_id, @Param("user_pwd") String user_pwd);
}
