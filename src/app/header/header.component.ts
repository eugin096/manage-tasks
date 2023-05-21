import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  formData: any;
  constructor (private router: Router,private toast:ToastService){}
  //Get the function to run out for the parent component to execute search operation from the header
  @Output("searchTasks") searchTasks: EventEmitter<any> = new EventEmitter<{searchValue: string}>
  ngOnInit(){
     //Initiate a form
    this.formData = new FormGroup({
      searchvalue : new FormControl("")
   });
   //Triggered every time when the change is made on the search input
   this.formData.get("searchvalue").valueChanges.subscribe((x: any) => {
    //Emitted back to the parent component to handle the search query
    this.searchTasks.emit({searchValue: x});
   })
  }
  logOut(){
    localStorage.removeItem('AuthToken')
    this.toast.showInfoToast('LoggedOut', 'User is logged Out')
      //Wait untill the user is notified and route to the signIn page
      setTimeout(()=>{
        this.router.navigate(['signIn'])
      })
  }
}
