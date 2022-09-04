package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.config.security.auth.JwtAuthenticationToken;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.model.TagModel;
import com.expense.expensemanagement.model.UserContext;
import com.expense.expensemanagement.service.tag.ITagService;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * Class used to handle Tag Resource.
 */
@RestController()
@RequestMapping("/expense/api/v1/tag")
public class TagController {

    private final ITagService tagService;

    public TagController(ITagService tagService) {
        this.tagService = tagService;
    }
//

    /**
     * Method used to create new Tag Resource.
     * @param tagModel
     * @param principal
     * @return
     */
    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public TagModel addTag(
            @RequestBody(required = true) TagModel tagModel,
            Principal principal
    ){
        tagModel.setUserId(ExpenseUtil.getUserId(principal));
        return this.tagService.addTag(tagModel);
    }

    /**
     * Method to get Tags
     * @param principal
     * @param pageNo
     * @param pageSize
     * @return
     */
    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<TagModel> getAllTag(
            Principal principal,
            @RequestHeader(name = "pageNo",defaultValue = "0",required = false) int pageNo,
            @RequestHeader(name = "size",defaultValue = "10",required = false) int pageSize
            ){
        return this.tagService.getTags(ExpenseUtil.getUserId(principal), pageNo, pageSize);
    }

    /**
     * Method to delete tags.
     * @param id
     * @param principal
     * TODO: Delete tag only if nothing is mapped.
     */
    @DeleteMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteTag(
            @PathVariable long id,
            Principal principal
    ){
        TagModel tagModel = this.tagService.findTags(id, ExpenseUtil.getUserId(principal));
        this.tagService.deleteTag(tagModel.getId());
    }


}
