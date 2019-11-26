package kz.ivc.mysql.controllers;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(value = "welcome")
public class WelcomeController {

    @RequestMapping(value = "/en", method = {RequestMethod.POST, RequestMethod.GET})
    public String welcomeEn(HttpServletRequest request, Model model) {
        String lang ="en";
        model.addAttribute("lang", lang);
        return "welcome";
    }

    @RequestMapping(value = "/kk", method = {RequestMethod.POST, RequestMethod.GET})
    public String welcomeKk(HttpServletRequest request, Model model) {
        String lang ="kk";
        model.addAttribute("lang", lang);
        return "welcome";
    }

}
