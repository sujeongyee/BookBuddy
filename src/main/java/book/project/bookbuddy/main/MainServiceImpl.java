package book.project.bookbuddy.main;

import book.project.bookbuddy.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("mainService")
public class MainServiceImpl implements MainService{

    @Autowired
    private MainMapper mainMapper;

    public int checkUser(UserVO vo){
        return mainMapper.checkUser(vo);
    }


}
