package book.project.bookbuddy.main;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("mainService")
public class MainServiceImpl implements MainService{

    @Autowired
    private MainMapper mainMapper;


    @Override
    public int checkUser(String user_id, String user_pwd) {
        return mainMapper.checkUser(user_id, user_pwd);
    }
}
