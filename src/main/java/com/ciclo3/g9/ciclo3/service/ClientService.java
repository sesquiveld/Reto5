package com.ciclo3.g9.ciclo3.service;



import com.ciclo3.g9.ciclo3.model.Client;
import com.ciclo3.g9.ciclo3.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll() {

        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int id) {

        return clientRepository.getClient(id);
    }

    public Client save(Client c) {
        if (c.getIdClient() == null) {
            return clientRepository.save(c);
        } else {
            Optional<Client> caux = clientRepository.getClient(c.getIdClient());
            if (caux.isEmpty()) {
                return clientRepository.save(c);
            } else {
                return c;
            }
        }
    }

    public Client update(Client c){
        if(c.getIdClient()!= null){
            Optional<Client> g = clientRepository.getClient(c.getIdClient());
            if(!g.isEmpty()){
             /*   if(c.getEmail()()!=null){
                    g.get().setEmail(c.getEmail());;
                }*/
                if(c.getPassword()!=null){
                    g.get().setPassword(c.getPassword());
                }
                if(c.getName()!=null){
                    g.get().setName(c.getName());
                }
                if(c.getAge()!=null){
                    g.get().setAge(c.getAge());
                }
                return clientRepository.save(g.get());
            }
        }
        return c;
    }

    public boolean deleteClient(int id) {
        Optional<Client> c= getClient(id);
        if(!c.isEmpty()){
            clientRepository.delete(c.get());
            return true;
        }
        return false;
    }


}