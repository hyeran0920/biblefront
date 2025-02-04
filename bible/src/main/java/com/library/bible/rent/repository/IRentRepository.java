package com.library.bible.rent.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.library.bible.rent.model.Rent;

@Mapper
@Repository
public interface IRentRepository {
	
	//Get all rent list
	List<Rent> selectAllRent();
	
	//Rent table CRUD
	Rent selectRent(long rentId);
	int insertRent(Rent rent);
	int insertRents(List<Rent> rents);
	int updateRent(Rent rent);
	int deleteRent(long rentId);
	int deleteRentByRentHistoryId(int rentHistoryId);
}
