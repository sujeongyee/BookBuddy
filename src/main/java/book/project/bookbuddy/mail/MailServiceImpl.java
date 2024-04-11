package book.project.bookbuddy.mail;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service("mailSerivce")
public class MailServiceImpl implements MailService{


    @Autowired
    private JavaMailSender mailSender;
    private String verificationCode;
    final String fromEmail = "sujeongyee0805@gmail.com";
    final String fromUsername = "BookBuddy";

    public String sendVerificationEmail(String email) {
        createCode();
        try {
            // 인증 메일 보내기
            MimeMessage mail = mailSender.createMimeMessage();

            // 제목
            String subject = "[BookBuddy] 인증 코드는 "+ verificationCode +" 입니다.";
            String charset = "UTF-8";
            // 내용
            String mailContent = "<html><head><style>" +
                    "body { font-family: Arial, sans-serif; }" +
                    "h2 { color: #333; }" +
                    "h3 { color: #007bff; }" +
                    "p { line-height: 1.5; }" +
                    "</style></head>" +
                    "<body>" +
                    "<p>안녕하세요! 책 추천 & 리뷰 플랫폼 BookBuddy입니다!</p>" +
                    "<p>BookBuddy를 시작하려면 다음 인증 코드를 회원가입 화면에 입력해주세요 :</p>" +
                    "<h3>"+ verificationCode +"</h3>" +
                    "<p>감사합니다.</p>" +
                    "</body></html>";

            // 보내는 사람 지정
            mail.setFrom(new InternetAddress(fromEmail, fromUsername));
            // 받는 사람 지정
            mail.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
            // 이메일 제목
            mail.setSubject(subject, charset);
            // 내용
            mail.setText(mailContent, charset, "html"); // "html" 추가 시 HTML 태그가 해석됨

            mailSender.send(mail);

        } catch (Exception e){
            e.printStackTrace();
        }

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
