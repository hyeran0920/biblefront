package com.library.bible.book.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.library.bible.book.model.Book;

public interface IBookService {
	
	int getBookCount();
	int getBookCount(int categoryid);
	
	List<Map<String, Object>> getBookListMap();
	Map<String, Object> getBookInfoMap(int bookid);
	
	List<Book> getBookList();
	Book getBookInfo(int bookid);
	Book updateBook(Book book, MultipartFile file);
	void insertBook(Book book, MultipartFile file);
	void deleteBook(int bookid);
	int deleteBook(int bookid, String author);
	
	List<Map<String, Object>> getBooksByCategory(String category);
	List<Map<String, Object>> getAllAuthor();
	List<Map<String, Object>> getAllPublisher();
	List<Map<String, Object>> getAllCategory();
	List<Map<String, Object>> searchBooks(String keyword);
	
	
}