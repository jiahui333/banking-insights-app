package org.example.repositories;

import org.example.models.Account;
import org.example.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByAccount(Account account);

}
