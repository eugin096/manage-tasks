import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  //Min date validation for a task creation as current date is the min date
  minDate = new Date().toISOString().split("T")[0];
  //Get the function to run out for the parent component to execute
  @Output("addTasks") addTasks: EventEmitter<any> = new EventEmitter<{title: string, description: string, dueData: Date}>();
  formdata: any;
  constructor(private shared:SharedService ) {}
  ngOnInit(){
    //Initiate a form
    this.formdata = new FormGroup({
      title: new FormControl(""),
      description: new FormControl(""),
      date: new FormControl("")
   });
   //check the shared data to close and open the accordian since it's in a same page flow
   this.shared.getParentData().subscribe(parentData => {
    if(parentData=='Success'){
      var form = document.getElementsByClassName('addTaskForm')[0] as HTMLFormElement;
      var button = document.getElementsByClassName('addTaskButton')[0] as HTMLAnchorElement;
      button.click();
      this.formdata.reset();
      form.classList.remove('was-validated');
    }
  })
  }
  //Check validation of a form submit for the task creation
  validate(event: Event, addTaskData: any){
    var form = document.getElementsByClassName('addTaskForm')[0] as HTMLFormElement;
    //Get the form element of the particular submit form on a task creation
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else{
      //If form is valid send the data to the backend server
      this.addTasks.emit({title: addTaskData.title, description: addTaskData.description, dueData: addTaskData.date})
    }
    form.classList.add('was-validated');
  }
}
