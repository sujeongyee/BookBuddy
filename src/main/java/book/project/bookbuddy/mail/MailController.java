package book.project.bookbuddy.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/book/regist/")
public class MailController {

    @Autowired
    private MailService mailService;

    @PostMapping("/sendMail")
    public String sendMail(@RequestBody Map<String,String> map) {
        System.out.println("-------------");
        System.out.println(map.get("email"));
        // 이메일 발송
        //String code = mailService.sendVerificationEmail(email);
        return "code";
    }



}
