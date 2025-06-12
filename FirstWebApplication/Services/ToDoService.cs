using FirstWebApplication.Models;
using FirstWebApplication.ToDoRepositories;
using Microsoft.AspNetCore.JsonPatch;

public class TodoService : ITodoService
{
    private readonly ListaDeTarefas lista = new ListaDeTarefas(); //acessa lista

    public List<ToDo> GetAll() => lista.GetAll().ToList(); //pega todas as tarefas

    public ToDo? GetById(int id) => lista.GetById(id); // pega tarefa por id

    public void Add(ToDo newTodo) // adiciona novo toDo a lista de tarefas
    {
        newTodo.Id = lista.GetNextId();
        lista.Add(newTodo);
    }

    public bool Delete(int id) //deleta uma tarefa
    {
        var toDo = GetById(id);
        if (toDo == null) return false;
        return lista.Remove(toDo);
    }

    public bool Patch(int id, JsonPatchDocument<ToDo> patchDoc, out ToDo? updatedToDo) // patch do status da tarefa
    {
        updatedToDo = GetById(id);
        if (updatedToDo == null) return false;
        patchDoc.ApplyTo(updatedToDo);
        return true;
    }
}
