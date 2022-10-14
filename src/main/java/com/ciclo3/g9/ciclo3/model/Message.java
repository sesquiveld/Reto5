package com.ciclo3.g9.ciclo3.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="message")
public class Message implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMessage;
    private String messageText;

    @ManyToOne
    @JoinColumn(name="idCar")
    @JsonIgnoreProperties(value={"messages","reservations"})
    private Car car;

    @ManyToOne
    @JoinColumn(name="idClient")
    @JsonIgnoreProperties(value={"messages","reservations"})
    private Client client;

}
