package com.mascova.caliga.service;

import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import com.github.dandelion.datatables.core.ajax.DataSet;
import com.github.dandelion.datatables.core.ajax.DatatablesCriterias;
import com.mascova.caliga.domain.User;
import com.mascova.caliga.repository.UserRepository;
import com.mascova.caliga.repository.UserSearchRepository;

/**
 * Created by zulfy on 12/29/14.
 */
@Service(value = "userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserSearchRepository userSearchRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${base.url}")
    private String baseUrl;

    @Value("${spring.mail.username}")
    private String emailSender;

    /**
     * {@inheritDoc}
     */

    public DataSet<User> findUsersWithDatatablesCriterias(DatatablesCriterias criterias) {

        List<User> users = userSearchRepository.findUserWithDatatablesCriterias(criterias);
        Long count = userSearchRepository.getTotalCount();
        Long countFiltered = userSearchRepository.getFilteredCount(criterias);

        return new DataSet<>(users, count, countFiltered);
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public User findByEmailAndActivationKey(String email, String activationKey) {
        return userRepository.findByEmailAndActivationKey(email, activationKey);
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public void resetPassword(User u) {
        User user = userRepository.findOne(u.getLogin());
        String activationKey = RandomStringUtils.randomAlphanumeric(20);
        user.setActivationKey(activationKey);
        userRepository.save(user);

        Context context = new Context();
        context.setVariable("name", user.getFirstName());
        context.setVariable("verifyUrl", new StringBuilder(baseUrl).append("/activation/").append(user.getEmail()).append("/").append(user.getActivationKey()));

        String htmlContent = templateEngine.process("mail/forget-password", context);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setSubject("Request for request password");
            message.setFrom(emailSender);
            message.setTo(user.getEmail());
            message.setText(htmlContent, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public User findById(String s) {
        return userRepository.findOne(s);
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class, timeout = 30)
    public User saveOrUpdate(User entity) {
        User user = userRepository.findOne(entity.getLogin());
        boolean sendEmail = false;
        User newUser;
        if(user != null){
            user.setEmail(entity.getEmail());
            user.setFirstName(entity.getFirstName());
            user.setLastName(entity.getLastName());
            user.setActivated(entity.getActivated());
            user.setAuthorities(entity.getAuthorities());
        }
        else{
            user = entity;
            user.setActivated(false);
            user.setActivationKey(RandomStringUtils.randomAlphanumeric(20));
            sendEmail = true;
        }
        if(entity.getPassword() != null && entity.getPassword() != ""){
            String password = passwordEncoder.encode(entity.getPassword());
            user.setPassword(password);
        }
        newUser = userRepository.save(user);

        if(sendEmail){
            Context context = new Context();
            context.setVariable("name", newUser.getFirstName());
            context.setVariable("userName", newUser.getLogin());
            context.setVariable("roleList", newUser.getAuthorities());
            context.setVariable("verifyUrl", new StringBuilder(baseUrl).append("/activation/").append(newUser.getEmail()).append("/").append(newUser.getActivationKey()));

            String htmlContent = templateEngine.process("mail/new-user", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            try {
                MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                message.setSubject("Welcome to Netisen Media Analysis");
                message.setFrom(emailSender);
                message.setTo(newUser.getEmail());
                message.setText(htmlContent, true);
                mailSender.send(mimeMessage);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }

        return newUser;
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class, timeout = 30)
    public void delete(User entity) {
        userRepository.delete(entity);
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class, timeout = 30)
    public void deleteById(String s) {
        User user = userRepository.findOne(s);
        userRepository.delete(user);
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Long getTotalData() {
        return userRepository.count();
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<User> getAll() {
        return userRepository.findAll();
    }
}
