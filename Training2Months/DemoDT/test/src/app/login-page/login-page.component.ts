import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  //API
  loginApi(username: string, password: string) {
    const url = `http://localhost:8778/dt-controller/login-to-course?password=${password}&username=${username}`
    return this.http.get<any>(url).toPromise();
  }

  username: string = '';
  password: string = '';

  async login(username: string, password: string): Promise<void> {
    console.log(username, '  :  ', password)
    try {
      const response = await this.loginApi(username, password);
      if (response) {
        console.log('Login successful');
        console.log(response)
        localStorage.setItem('userCode', response);
        this.router.navigate(['/home-page'])
      } else {
        console.log('Login failed');
        alert('login failed')
      }
    } catch (error) {
      console.error('Login API Error:', error);
    }
  }


}
