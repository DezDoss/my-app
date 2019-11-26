package kz.ivc.mysql.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(value = "statistic")
public class StatisticController {

    @RequestMapping(value = "/en", method = {RequestMethod.POST, RequestMethod.GET})
    public String en(HttpServletRequest request, Model model) {
        String lang ="en";
        model.addAttribute("lang", lang);
        return "statistic";
    }

    @RequestMapping(value = "/kk", method = {RequestMethod.POST, RequestMethod.GET})
    public String kk(HttpServletRequest request, Model model) {
        String lang ="en";
        model.addAttribute("lang", lang);
        return "statistic";
    }

}
