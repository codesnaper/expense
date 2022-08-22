package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.model.TagModel;
import com.expense.expensemanagement.service.tag.ITagService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/tag")
public class TagController {

    private final ITagService tagService;

    public TagController(ITagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public TagModel addTag(
            @RequestBody(required = true) TagModel tagModel
    ){
        return this.tagService.addTag(tagModel);
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<TagModel> getAllTag(
            @RequestHeader(name = "pageNo",defaultValue = "0",required = false) int pageNo,
            @RequestHeader(name = "size",defaultValue = "10",required = false) int pageSize
            ){
        return this.tagService.getTags(pageNo, pageSize);
    }

    @DeleteMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void deleteTag(
            @PathVariable long id,
            @RequestHeader(name = "userId",value = "") String userid
    ){
        this.tagService.deleteTag(id,userid);
    }
}
