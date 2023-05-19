import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user!: User;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.loggedUser$.subscribe((res) => {
      this.user = res;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
