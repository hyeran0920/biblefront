package com.library.bible.rent.service;

import java.util.List;

import com.library.bible.rent.model.Rent;

public interface IRentService {
	
	List<Rent> selectAllRent();
	
	Rent selectRent(long rentId);
	void insertRent(Rent rent);
	void updateRent(Rent rent);
	int deleteRent(long rentId);
}
