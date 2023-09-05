import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.css'],
    standalone: true
})
export class TermsComponent {

  constructor(private titleService: Title, private metaTagService: Meta) {
    this.titleService.setTitle("AffittaSardegna - Termini e condizioni");
    this.metaTagService.updateTag({ name: 'description', content: 'Termini e condizioni di prenotazione' });
  }

}
