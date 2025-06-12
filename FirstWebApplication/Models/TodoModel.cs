using System.Runtime.ConstrainedExecution;

namespace FirstWebApplication.Models
{
    public class ToDo // Modelo de tarefa a ser cadastrado
    {
        public int Id { get; set; }
        public string title { get; set; } = null!;// titulo da tafera
        public string description { get; set; } = null!; // descrição da tarefa
        public string deadline { get; set; } = null!; // data de vencimento 
        public string status { get; set; } = null!; // status da tarefa
        
    }
}
