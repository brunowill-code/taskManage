using FirstWebApplication.Models;

namespace FirstWebApplication.ToDoRepositories
{

    public class ListaDeTarefas
    {

        private readonly List<ToDo> toDos = new List<ToDo> // lista privada, só pode ser modificada nessa classe
        {
            new ToDo
            {
                Id = 1,
                title = "Contabilidade",
                description = "Fazer contabilidade",
                deadline = "15/06/2025",
                status = "Pendente",
            },
            new ToDo
            {
                Id = 2,
                title = "Reunião com cliente",
                description = "Agendar e realizar reunião com o cliente XPTO",
                deadline = "17/06/2025",
                status = "Pendente",
            },

            new ToDo
            {
                Id = 3,
                title = "Atualizar sistema",
                description = "Atualizar o sistema para a versão mais recente",
                deadline = "01/06/2025",
                status = "Pendente",
            },

            new ToDo
            {
                Id = 4,
                title = "Enviar relatório",
                description = "Gerar e enviar relatório mensal ao gestor",
                deadline = "12/05/2025",
                status = "Pendente",
            },

            new ToDo
            {
                Id = 5,
                title = "Backup de dados",
                description = "Realizar backup completo do servidor",
                deadline = "12/05/2025",
                status = "Pendente",
            },
        };

        public IReadOnlyList<ToDo> GetAll() => toDos.AsReadOnly(); // método para retornar toda lista

        public ToDo? GetById(int id) => toDos.FirstOrDefault(t => t.Id == id); // método para pegar um item pelo ID

        public void Add(ToDo todo) => toDos.Add(todo); // método para adicionar um novo item à lista

        public bool Remove(ToDo todo) => toDos.Remove(todo); // remover um item da lista

        public int GetNextId() => toDos.Count == 0 ? 1 : toDos.Max(t => t.Id) + 1; // pega o proximo id para adicionar todo
    }    
}
