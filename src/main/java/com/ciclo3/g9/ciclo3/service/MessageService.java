package com.ciclo3.g9.ciclo3.service;

import com.ciclo3.g9.ciclo3.model.Car;
import com.ciclo3.g9.ciclo3.model.Message;
import com.ciclo3.g9.ciclo3.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService{

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){

        return messageRepository.getAll();
    }

    public Optional<Message> getMessage(int id){
        return messageRepository.getMessage(id);
    }

    public Message save(Message m){
        if (m.getIdMessage()==null){
            return messageRepository.save(m);
        }else{
            Optional<Message> maux = messageRepository.getMessage(m.getIdMessage());
            if(maux.isEmpty()){
                return messageRepository.save(m);
            }else{
                return m;
            }
        }

    }

    public Message update(Message m){
        if(m.getIdMessage()!= null){
            Optional<Message> g = messageRepository.getMessage(m.getIdMessage());
            if(!g.isEmpty()){
                if(m.getMessageText()!=null){
                    g.get().setMessageText(m.getMessageText());
                }
                return messageRepository.save(g.get());
            }
        }
        return m;
    }

    public boolean deleteMessage(int id) {
        Optional<Message> m= getMessage(id);
        if(!m.isEmpty()){
            messageRepository.delete(m.get());;
            return true;
        }
        return false;
    }
}
