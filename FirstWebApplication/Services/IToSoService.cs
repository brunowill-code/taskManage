using FirstWebApplication.Models;
using Microsoft.AspNetCore.JsonPatch;

public interface ITodoService
{
    List<ToDo> GetAll();
    ToDo? GetById(int id);
    void Add(ToDo newTodo);
    bool Delete(int id);
    bool Patch(int id, JsonPatchDocument<ToDo> patchDoc, out ToDo? updatedToDo);
}