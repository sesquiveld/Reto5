package com.ciclo3.g9.ciclo3.service;

import com.ciclo3.g9.ciclo3.model.Admin;
import com.ciclo3.g9.ciclo3.model.Car;
import com.ciclo3.g9.ciclo3.repository.AdminRepository;
import com.ciclo3.g9.ciclo3.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll(){
        return adminRepository.getAll();
    }

    public Optional<Admin> getAdmin(int id){
        return adminRepository.getAdmin(id);
    }

    public Admin save(Admin a){
        if (a.getIdAdmin()==null){
            return adminRepository.save(a);
        }else{
            Optional<Admin> adminaux = adminRepository.getAdmin(a.getIdAdmin());
            if(adminaux.isEmpty()){
                return adminRepository.save(a);
            }else{
                return a;
            }
        }

    }

    public Admin update(Admin a){
        if(a.getIdAdmin()!= null){
            Optional<Admin> g = adminRepository.getAdmin(a.getIdAdmin());
            if(!g.isEmpty()){
                if(a.getPassword()!=null){
                    g.get().setPassword(a.getPassword());
                }
                if(a.getName()!=null){
                    g.get().setName(a.getName());
                }
                if(a.getEmail()!=null){
                    g.get().setEmail(a.getEmail());
                }
                return adminRepository.save(g.get());
            }
        }
        return a;
    }

    public boolean deleteAmin(int id) {
        Optional<Admin> a= getAdmin(id);
        if(!a.isEmpty()){
            adminRepository.delete(a.get());
            return true;
        }
        return false;
    }

}
