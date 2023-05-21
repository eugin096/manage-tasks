import { Component } from '@angular/core';
import { SignInService } from './sign-in.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private SignIn: SignInService, private toast:ToastService, private router:Router){

  }
  formdata: any;
  ngOnInit(){
    this.formdata = new FormGroup({
      email: new FormControl(""),
      passwd: new FormControl("")
   });
  }
  disableButton : boolean = false;
  //Check validation of a form submit for the checking the userData form submission
  validate(event: Event, userDetails: any){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    //Get the form element of the particular submit form on login
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //check if value is there on both the inputs
    else{
      this.disableButton = true;
      this.SignIn.login(userDetails.email, userDetails.passwd).subscribe(
        (response)=>{
          localStorage.setItem('AuthToken', response.token as string)
          //On successfull authentication show success toast to the user
          this.toast.showSuccessToast('Success', 'You are Logged in Successfully')
          setTimeout(()=>{
            //Wait untill the user is notified and route to the dashboard
            this.formdata.reset()
            this.router.navigate(['home'])
          },2000)
        },
        (error) =>{
          //Throw error if the user credentials or server related issues
          this.toast.showErrorToast('Error', error.error);          
          this.disableButton = false;
          console.error(error)
        } 
      )
    }
    form.classList.add('was-validated');
  }
}
