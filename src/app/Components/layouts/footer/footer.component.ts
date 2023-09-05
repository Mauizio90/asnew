import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class FooterComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });
    }
  }
  
}
