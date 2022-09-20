package com.dangProject.board.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Board {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;
}
