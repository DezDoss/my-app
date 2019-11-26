package kz.ivc.mysql.Service;

import kz.ivc.mysql.DAO.CompanyDAO;
import kz.ivc.mysql.Model.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    CompanyDAO companyDAO = new CompanyDAO();


    public CompanyService() {
    }

    public Company findCompany(int id) {
        return companyDAO.findById(id);
    }

    public void saveCompany(Company company) {
        companyDAO.save(company);
    }

    public void deleteCompany(Company company) {
        companyDAO.delete(company);
    }

    public void updateCompany(Company company) {
        companyDAO.update(company);
    }

    public List<Company> findAllCompany() {
        return companyDAO.findAll();
    }
}
