import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  //API
  loginApi(username: string, password: string) {
    const url = `http://localhost:8778/pure-controller/t-login?password=${password}&username=${username}`
    return this.http.get<any>(url).toPromise();
  }

  username: string = '';
  password: string = '';

  async login(username: string, password: string): Promise<void> {
    try {
      const response = await this.loginApi(username, password);
      if (response) {
        console.log('Login successful');
        localStorage.setItem('username', response.firstname);
        localStorage.setItem('position', response.position);
        this.router.navigate(['/home'])
      } else {
        console.log('Login failed');
        alert('login failed')
      }
    } catch (error) {
      console.error('Login API Error:', error);
    }
  }

}
