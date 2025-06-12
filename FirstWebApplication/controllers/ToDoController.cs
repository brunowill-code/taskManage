using FirstWebApplication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FirstWebApplication.ToDoRepositories;
using Microsoft.AspNetCore.JsonPatch;

namespace FirstWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {

        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public ActionResult<List<ToDo>> GetToDo()
        {
            return Ok(_todoService.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<ToDo> GetTaskById(int id)
        {
            var toDo = _todoService.GetById(id);
            if (toDo == null)
            {
                return NotFound();
            }
            return Ok(toDo);
        }

        // adicionar uma nova tarefa
        [HttpPost]
        public ActionResult<List<ToDo>> AddToDo(ToDo newToDo)
        {
            if (newToDo == null)
            {
                return BadRequest(); // se nova tarefa não existir retorna bad request
            }
            // chamar o service de adicionar na lista!
            _todoService.Add(newToDo);
            return CreatedAtAction(nameof(GetTaskById), new { id = newToDo.Id }, newToDo);
        }

        // Excluir uma tarefa
        [HttpDelete("{id}")]
        public IActionResult DeleteToDo(int id)
        {
            var deleted  = _todoService.Delete(id); // encontra a tarefa na lista de tarefas
            return deleted ? NoContent() : NotFound();
        }

        //atualizar status
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchUsuario(int id, [FromBody] JsonPatchDocument<ToDo> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            var success = _todoService.Patch(id, patchDoc, out var updated);
            return success ? Ok(updated) : NotFound();

        }
    }
}