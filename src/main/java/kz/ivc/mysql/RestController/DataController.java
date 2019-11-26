package kz.ivc.mysql.RestController;

import kz.ivc.mysql.Model.Company;
import kz.ivc.mysql.Service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping(value = "/data")
public class DataController {
    @Autowired
    private CompanyService companyService;

    @RequestMapping(value = "/company", method = RequestMethod.GET)
    public List<Company> getData() {

        CompanyService companyService = new CompanyService();
        List<Company> companyList = companyService.findAllCompany();
        return companyList;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String saveCompany(@RequestParam(value = "name") String name,
                              @RequestParam(value = "price") int price,
                              @RequestParam(value = "change") int change,
                              @RequestParam(value = "pctchange") int pctChange,
                              @RequestParam(value = "lasthange") String date) throws ParseException {


        DateFormat formatter;
        Date newDate;
        formatter = new SimpleDateFormat("mm/dd/yy");
        newDate = formatter.parse(date);

        Company company = new Company();

        company.setName(name);
        company.setPrice(price);
        company.setChange(change);
        company.setPctChange(pctChange);
        company.setLastChange(newDate);
        companyService.saveCompany(company);
        System.out.println(name + " " + newDate + " " + price + " " + change + " " + pctChange);


        return "hahaha saved";
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public String deleteCompany(@RequestParam(value = "id") int id,
                                @RequestParam(value = "name")  String name,
                                @RequestParam(value = "price") int price,
                                @RequestParam(value = "change") int change,
                                @RequestParam(value = "pctchange") int pctChange,
                                @RequestParam(value = "lastchange") String date) throws ParseException {


        System.out.println(name + " "+ id + " " + price + " " + change + " "+ pctChange + " " + date);

        DateFormat formatter;
        Date newDate;
        formatter = new SimpleDateFormat("mm-dd-yy");
        newDate = formatter.parse(date);
        Company company = new Company();

        company.setId(id);
        company.setName(name);
        company.setPrice(price);
        company.setChange(change);
        company.setPctChange(pctChange);
        company.setLastChange(newDate);
        companyService.deleteCompany(company);


        return "hahaha deleted";
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String updateCompany(@RequestParam(value = "id") int id,
                                @RequestParam(value = "name") String name,
                                @RequestParam(value = "price") int price,
                                @RequestParam(value = "change") int change,
                                @RequestParam(value = "pctchange") int pctChange,
                                @RequestParam(value = "lastchange") String date) throws ParseException {


        DateFormat formatter;
        Date newDate;
        formatter = new SimpleDateFormat("mm-dd-yy");
        newDate = formatter.parse(date);

        Company company = new Company();

        company.setId(id);
        company.setName(name);
        company.setPrice(price);
        company.setChange(change);
        company.setPctChange(pctChange);
        company.setLastChange(newDate);
        companyService.updateCompany(company);
        System.out.println(" " + name + " " + newDate + " " + price + " " + change + " " + pctChange);


        return "hahaha updated";
    }
}
