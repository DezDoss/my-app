package kz.ivc.mysql.DAO;

import kz.ivc.mysql.HibernateSessionFactoryUtil;
import kz.ivc.mysql.Model.Company;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class CompanyDAO {
    public CompanyDAO() {
    }

    public Company findById(int id) {

        Session session = HibernateSessionFactoryUtil.getSessionFactory().openSession();
        return session.get(Company.class, id);
    }

    public void save(Company company) {
        Session session = HibernateSessionFactoryUtil.getSessionFactory().openSession();
        Transaction tx1 = session.beginTransaction();
        session.save(company);
        tx1.commit();
        session.close();
    }

    public void update(Company company) {
        Session session = HibernateSessionFactoryUtil.getSessionFactory().openSession();
        Transaction tx1 = session.beginTransaction();
        session.update(company);
        tx1.commit();
        session.close();
    }

    public void delete(Company company) {
        Session session = HibernateSessionFactoryUtil.getSessionFactory().openSession();
        Transaction tx1 = session.beginTransaction();
        session.delete(company);
        tx1.commit();
        session.close();
    }


    public List<Company> findAll() {
        List<Company> bookList = (List<Company>) HibernateSessionFactoryUtil.getSessionFactory().openSession().createQuery("From Company").list();
        return bookList;
    }
}
