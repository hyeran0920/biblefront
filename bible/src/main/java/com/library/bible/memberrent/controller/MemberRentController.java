package com.library.bible.memberrent.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.bible.memberrent.model.MemberRent;
import com.library.bible.memberrent.service.IMemberRentService;
import com.library.bible.resolver.AuthMember;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberRentController {
	private final IMemberRentService memberRentService;
	private final String MEMBER_RENT_PATH = "/rent-status";
	
	@GetMapping("/me" + MEMBER_RENT_PATH)
	public ResponseEntity<MemberRent> selectMemberRentBytToken(@AuthMember Long memId) {
		MemberRent memberRent = memberRentService.selectMemberRentByMemId(memId);
		return ResponseEntity.ok(memberRent);
	}

	@GetMapping("/{memId}" + MEMBER_RENT_PATH)
	public ResponseEntity<MemberRent> selectMemberRent(@PathVariable long memId) {
		MemberRent memberRent = memberRentService.selectMemberRentByMemId(memId);
		return ResponseEntity.ok(memberRent);
	}
	
	@PutMapping("/me" + MEMBER_RENT_PATH)
	public ResponseEntity<MemberRent> updateMemberRent(@AuthMember Long memId, @Valid @RequestBody MemberRent memberRent) {
		memberRent.setMemId(memId);
		memberRentService.updateMemberRent(memberRent);
		return ResponseEntity.ok(memberRent);
	}

	@PutMapping("/{memId}" + MEMBER_RENT_PATH)
	public ResponseEntity<MemberRent> updateMemberRent(@PathVariable long memId, @Valid @RequestBody MemberRent memberRent) {
		memberRent.setMemId(memId);
		memberRentService.updateMemberRent(memberRent);
		return ResponseEntity.ok(memberRent);
	}

	@DeleteMapping("/me" + MEMBER_RENT_PATH)
	public ResponseEntity<?> deleteAddress(@AuthMember Long memId) {
		memberRentService.deleteMemberRent(memId);
		return ResponseEntity.noContent().build();
	}

	
	@DeleteMapping("/{memId}" + MEMBER_RENT_PATH)
	public ResponseEntity<?> deleteAddressByMemId(@PathVariable long memId) {
		memberRentService.deleteMemberRent(memId);
		return ResponseEntity.noContent().build();
	}
}
