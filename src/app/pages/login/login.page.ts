import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FirebaseErrors } from '../../model/enums/firebase-errors.enum';
import { DialogService } from 'src/app/services/dialog.service';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  
  loginForm: FormGroup;

  testingUsers: User[] =
    [
      { "id": 1, "email": "admin@admin.com", "password": "111111", "profile": "admin", "sex": "femenino" },
      { "id": 2, "email": "invitado@invitado.com", "password": "222222", "profile": "invitado", "sex": "femenino" },
      { "id": 3, "email": "usuario@usuario.com", "password": "333333", "profile": "usuario", "sex": "masculino" },
      { "id": 4, "email": "anonimo@anonimo.com", "password": "444444", "profile": "usuario", "sex": "masculino" },
      { "id": 5, "email": "tester@tester.com", "password": "666666", "profile": "tester", "sex": "femenino" },
    ];

  opcionesDelActionSheet: any = {
    header: 'Usuarios para pruebas',
    cancelText: 'Dismiss'
  };


  constructor(private authService: AuthService,
    private router: Router,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      })
  }

  onLogin() {

    this.email = this.loginForm.get("email").value;
    this.password = this.loginForm.get("password").value;

    this.authService.onLogin(this.email, this.password).then(auth => {
      this.showLoading();
      setTimeout(() =>this.router.navigateByUrl('/home'), 2500); // hacemos una esperita para mostrar el bonito spiner que hicimos 
      
    }).catch(error => {
      console.log(error);
      switch (error.code) {

        case FirebaseErrors.user_not_found:
          this.dialogService.showMessage('Error', 'El usuario no existe, intente de nuevo por favor', 'error');
          break;

        case FirebaseErrors.wrong_password:
          this.dialogService.showMessage('Error', 'La contraseña es incorrecta', 'error');
          break;

        case FirebaseErrors.operation_not_allowed:
          this.dialogService.showMessage('Error', 'El método de auntenticación que esta utilizando se encuentra deshabilitado', 'error');
          break;

      }
    });
  }

  onRegister() {
    this.authService.onRegister(this.email, this.password);
  }

  onChangeTestingUser(event) {
    let idSeleccionado = event.detail.value; // Nos quedamos con el id del usuario seleccionado

    let usuarioSeleccionado = this.testingUsers.filter(unUsuarioTesting => unUsuarioTesting.id == idSeleccionado)[0];

    // Asignamos los valores a los input a traves del form
    this.loginForm.controls['email'].setValue(usuarioSeleccionado.email);
    this.loginForm.controls["password"].setValue(usuarioSeleccionado.password);

  }


  async showLoading() {
    const loading = await this.loadingController.create({
      message: '<ion-img src="/assets/img/loading.gif" alt="loading..."></ion-img>',
      cssClass: 'loading',
      translucent: true,
      showBackdrop: false,
      spinner: null,
      duration: 2500
    });

    loading.present();
  }


  

}
