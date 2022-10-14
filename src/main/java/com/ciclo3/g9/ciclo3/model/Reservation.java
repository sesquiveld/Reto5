    package com.ciclo3.g9.ciclo3.model;

    import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import javax.persistence.*;
    import java.util.Date;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name="reservation")
    public class Reservation {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer idReservation;
        private Date startDate;
        private Date devolutionDate;
        private String status="created";

        @ManyToOne
        @JoinColumn(name="idCar")
        @JsonIgnoreProperties("reservations")
        private Car car;

        @ManyToOne
        @JoinColumn(name="idClient")
        @JsonIgnoreProperties(value={"messages","reservations"})
        private Client client;

        @OneToOne(cascade = {CascadeType.REMOVE},mappedBy="reservation")
        @JsonIgnoreProperties("reservation")
        private Score score;

    }
