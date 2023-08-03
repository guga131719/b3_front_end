import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/model/task.model';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  showModal: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  openEditModal(task: Task | null, typeAction: string) {
    this.showModal = true;
    let idInput: any = document.getElementById("id") as HTMLInputElement | null
    let statusInput: any = document.getElementById("status") as HTMLInputElement | null
    let datesInput: any = document.getElementById("date") as HTMLInputElement | null
    let descriptionInput: any = document.getElementById("description") as HTMLInputElement | null

    const formElement = document.getElementById('formSend') as HTMLFormElement;

    descriptionInput.value = task?.description || ''
    datesInput.value = this.formatarDataInput(this.formatDate(task?.date || ''))
    statusInput.value = task?.status || ''
    idInput.value = task?.id || ''

   
  }

  closeModal() {
    this.showModal = false;
  }

  saveChanges() {

    const newTask: Task = {
      id: Number((document.getElementById("id") as HTMLInputElement)?.value || null),
      description: (document.getElementById("description") as HTMLInputElement)?.value || '',
      date: (document.getElementById("date") as HTMLInputElement)?.value || '',
      status: (document.getElementById("status") as HTMLInputElement)?.value || ''
    };


    this.taskService.createTaskOrUpdate(newTask).subscribe(
     () => {
        console.log('Tarefa atulizada no backend:', newTask);
        location.reload()
        debugger;
     },
     (error) => {
       debugger;
       console.error('Erro ao atualizar a tarefa:', error);
      }


   );

    this.showModal = false;
  }


  DeleteItem(task: Task ) {
  
    this.taskService.deleteTask(task.id).subscribe(
      () => {
        console.log('Tarefa deletada do backend:', task);
        location.reload();
        debugger;
      },
      (error) => {
        debugger;
        console.error('Erro ao deletar a tarefa:', error);
      }
    );

  }



  formatDate(dateString: string | undefined): string {

    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  formatarDataInput(dateString: string | undefined): string {
    var dataFormatada =""
    if (!!dateString) {

      const [dia, mes, ano] = dateString.split('/');
        dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

    }

    return dataFormatada;
  }


}
