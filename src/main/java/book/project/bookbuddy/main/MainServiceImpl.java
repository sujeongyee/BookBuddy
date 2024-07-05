package book.project.bookbuddy.main;


import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import book.project.bookbuddy.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import book.project.bookbuddy.command.CategoryVO;
import book.project.bookbuddy.command.KeywordVO;
import book.project.bookbuddy.command.NotificationVO;

@Service("mainService")
public class MainServiceImpl implements MainService{

    @Autowired
    private MainMapper mainMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public boolean checkUser(UserVO vo, String user_pwd) {
        if(vo != null){
            return passwordEncoder.matches(user_pwd, vo.getUser_PWD());
        }
        return false;
    }

    public List<CategoryVO> getAllCategories(){
        return mainMapper.getAllCategories();
    }

    public List<KeywordVO> getAllKeywords(){
        return mainMapper.getAllKeywords();
    }

    public int checkDuplicateId(String id){
        return mainMapper.checkDuplicateId(id);
    }

    public int checkDuplicateNick(String id){
        return mainMapper.checkDuplicateNick(id);
    }

    public Timestamp getTimeStamp(String time){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");    
        long timestamp = 0;
        try {
            Date parsedDate = dateFormat.parse(time);
            timestamp = parsedDate.getTime();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Timestamp timestamp2 = new Timestamp(timestamp);
        return timestamp2;
    }
    public int joinBuddy(UserVO vo){
        String encodedPassword = passwordEncoder.encode(vo.getUser_PWD());
        vo.setUser_PWD(encodedPassword);
        int n = mainMapper.joinBuddy(vo);
        return n;
    }
    public UserVO getVO(String id){
        return mainMapper.getVO(id);
    }

    public List<NotificationVO> getNoti(String userNo){
        return mainMapper.getNoti(userNo);
    }

   
}
