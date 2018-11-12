package com.ganesh.h2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ganesh.h2.model.User;
import com.ganesh.h2.repository.UserRepository;


@RestController
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	/*@Autowired
	private ModelMapper mapper; */	
	
    @RequestMapping(value = "/addUser",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)   
    public @ResponseBody String registerUser(@RequestBody User user) {
        
       // User user = mapper.map(userDto, User.class);
        
    	userRepository.save(user);
       
        return "Done";
    }
}
