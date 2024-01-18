import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-singup',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule,FormsModule],
  templateUrl: './signin-singup.component.html',
  styleUrl: './signin-singup.component.css',
})
export class SigninSingupComponent {
  regForm: boolean = false;
  signUpform!: FormGroup;
  signInform!: FormGroup;
  signUpsubmitted = false;
  href: string = '';
  user_data: any;
  user_dto!: User;
  user_reg_data: any;
  singInFormValue: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginservice: LoginSignupService
  ) {}
  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href == '/sign-up') {
      this.regForm = true;
    } else if (this.href == '/sign-in') {
      this.regForm = false;
    }

    this.signUpform = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutyou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  get rf() {
    return this.signUpform.controls;
  }
  onsubmitSignUp() {
    this.signUpsubmitted = true;
    if (this.signUpform.invalid) {
      return;
    }
    this.user_reg_data = this.signUpform.value;
    this.user_dto = {
      aboutyou: this.user_reg_data.aboutyou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipcode: this.user_reg_data.zipcode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role,
    };
    this.loginservice.userRegister(this.user_dto).subscribe((data) => {
      alert('User Register Successfull!!');
      this.router.navigateByUrl('/sign-in');
    });
  }
  onsubmitSignIn(){
    this.loginservice.authLogin(this.singInFormValue.userEmail, this.singInFormValue.userPassword).subscribe(data=>{
      this.user_data = data;
      if(this.user_data.length == 1){
        if(this.user_data[0].role  ==  "seller"){
          sessionStorage.setItem("user_session_id",this.user_data[0].id);
          sessionStorage.setItem("user_session_role",this.user_data[0].role);
          this.router.navigateByUrl("/seller-dashboard")
        }else if(this.user_data[0].role  ==  "buyer"){
          sessionStorage.setItem("user_session_id",this.user_data[0].id);
          sessionStorage.setItem("user_session_role",this.user_data[0].role);
          this.router.navigateByUrl("/buyer-dashboard")
        }else{
          alert("Invalid Credential")
        }
      }else{
        alert("Invalid")
      }
      console.log(this.user_data)
    },error=>{
      console.log("My error",error)
    }
    )
  }
}
