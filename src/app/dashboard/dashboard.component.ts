import { Component } from '@angular/core';
import { Task } from '../modals/task-type';
import { TasksService } from '../tasks.service';
import { ToastService } from '../toast/toast.service';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  //Get toast and task service file and initiate it
  constructor(private tasks: TasksService,private toast: ToastService, private shared:SharedService){}
  taskList: Task [] =[];

  //Searching the tasks inside a task dashboard
  searchTasks(eventData: {searchValue: string}){

    if(!eventData.searchValue.trim()){
      this.getTasks()
    } else{
      const filtered = this.taskList.filter(el => el.title.toLowerCase().includes(eventData.searchValue) || el.description.toLowerCase().includes(eventData.searchValue))
      this.taskList = [...filtered]
    }
  }

  //Add each tasks by clicking add new from the dashboard page.
  addTasks(eventData: {title:string, description: string, dueData: Date}){
    this.tasks.addTasks(eventData.title,eventData.description,eventData.dueData).subscribe(
      (response) =>{
        //Show sucess toast and send the value in shared service for the accordian to be closed
        this.toast.showSuccessToast('Success', 'Added a new task Successfully');
        this.shared.setParentData('Success');
        //Load the tasks again
        this.getTasks();
      },
      (error) =>{
        //Show the error as a error message to the user
        this.toast.showErrorToast('Error', error.error),
        //Send the shareddata for the failed case to keep the accordian open
        this.shared.setParentData('Failed');
        console.error(error);
      }
    )
  }

  //Triggered when mark as complete button to Update a task status as completed status
  updateTasks(eventData: {task_id: number, taskStatus: boolean}){
    this.tasks.updateTasks(eventData.task_id,eventData.taskStatus).subscribe(
      (response) =>{
        //Show sucess toast as a task is marked as completed
        this.toast.showSuccessToast('Success', 'Marked a task completed');
        this.getTasks(); 
      },
      (error) => {
        //Throw error if update is not possible because of some errors
        this.toast.showErrorToast('Error', 'Internal server error');          
        console.error(error)
      }
    )
  }
  //delete button a task card is triggered and this function will be called to delete a finished task
  deleteTasks(eventData: {task_id:number}){
    this.tasks.deleteTasks(eventData.task_id).subscribe(
      (response) => {
        //Show sucess toast as a task is deleted
        this.toast.showSuccessToast('Success', 'Deleted Task successfully');
        this.getTasks();
      },
      (error) => {
        //Throw error if delete is not possible because of some errors
        this.toast.showErrorToast('Error', 'Internal server error');          
        console.error(error);
      }
    )
  }
  ngOnInit(){
    //While then page loads trigger this function to get the available tasks in the database server
    this.getTasks();
  }

  //Triggered on page load to get the already created tasks from the particular user
  getTasks(){
    this.tasks.getTasks().subscribe(
      (response)=> {
        //assign the value got from the backend to a innitiated array
        this.taskList = response;
      },
      (error) =>{
        //Throw error if fetching is not possible
        this.toast.showErrorToast('Error', 'Internal server error');          
        console.error(error)
      } 
    )
  }
}
