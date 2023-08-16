import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  target_kw = ''
  logoUrl = '/assets/icon/FX.png'

  navBarItem = [
    {
      text: 'Chart learning',
      url: '/learn/learn-chart'
    },
    {
      text: 'Blog',
      url: '/blog/all'
    },
    {
      text: 'Series',
      url: '/blog/series'
    },
  ]

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void { }

  search(){
    this.router.navigate(['/search'],
      { 
        queryParams: {kw:this.target_kw}
      });
  }
}
