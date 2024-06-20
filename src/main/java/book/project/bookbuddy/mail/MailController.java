package book.project.bookbuddy.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/book/regist")
public class MailController {

    @Autowired
    private MailService mailService;

    // 이메일 발송
    @PostMapping("/sendMail")
    public String sendMail(@RequestBody Map<String,String> map) {   
        String code = mailService.sendVerificationEmail(map.get("email"));
        System.out.println("controller CODE : "+ code);
        return code;
    }



}
