import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../modals/task-type';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() taskList: Task [] = [];
  //Get the function to run out for the parent component to execute
  @Output("updateTasks") updateTasks: EventEmitter<any> = new EventEmitter<{task_id: number, taskStatus: boolean}>();
  //Get the function to run out for the parent component to execute
  @Output("deleteTasks") deleteTasks: EventEmitter<any> = new EventEmitter<{task_id: number}>();

  //Triggered when user clicks on mark as complete inside the task card
  markComplete(taskId: Number, taskStatus:boolean){
    //send data back to the parent component
    this.updateTasks.emit({task_id:taskId, taskStatus:taskStatus });
  }

  //Triggered when user clicks on delete button inside the task card
  deleteTask(taskId: Number){
    //send data back to the parent component
    this.deleteTasks.emit({task_id:taskId});
  }
}
