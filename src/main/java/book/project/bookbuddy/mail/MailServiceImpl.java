package book.project.bookbuddy.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service("mailSerivce")
public class MailServiceImpl implements MailService{

    @Autowired
    private MailSender mailSender;
    protected String verificationCode;

    public String sendVerificationEmail(String email) {
        createCode();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Verification Code");
        message.setText("Your verification code is: " + verificationCode);
        mailSender.send(message);
        return verificationCode;
    }


    // 인증번호 생성
    public void createCode() {
        Random random = new Random();
        StringBuilder key = new StringBuilder();

        for(int i=0; i<8; i++) {
            int idx = random.nextInt(3);
            switch (idx) {
                case 0 :
                    key.append((char) ((int)random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) ((int)random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append(random.nextInt(9));
                    break;
            }
        }
        verificationCode = key.toString();
    }

}
