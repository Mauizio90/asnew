import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { AccommodationService } from '../../services/accommodation.service';
import { Accommodation } from '../../models/accommodation';
import { HousecardsComponent } from '../../layouts/housecards/housecards.component';
import { Title, Meta } from '@angular/platform-browser';
import { NgFor } from '@angular/common';


@Component({
    selector: 'app-accommodations',
    templateUrl: './accommodations.component.html',
    styleUrls: ['./accommodations.component.css'],
    standalone: true,
    imports: [NgFor, HousecardsComponent]
})
export class AccommodationsComponent {
  public allAccommodations?: Accommodation[];
  public originalAccommodations?: Accommodation[];
  public selectableCities: { name: string, selected: boolean }[] = [
    { name: 'Aglientu', selected: false },
    { name: 'Alghero', selected: false },
    { name: 'Badesi', selected: false },
    { name: 'Baja Sardinia', selected: false },
    { name: 'Bosa', selected: false },
    { name: 'Budoni', selected: false },
    { name: 'Cala Gonone', selected: false },
    { name: 'Cannigione', selected: false },
    { name: 'Castelsardo', selected: false },
    { name: 'Costa Paradiso', selected: false },
    { name: 'Golfo Aranci', selected: false },
    { name: 'Isola La Maddalena', selected: false },
    { name: 'Lido del Sole', selected: false },
    { name: 'Limpiddu', selected: false },
    { name: 'Loiri Porto San Paolo', selected: false },
    { name: 'Marina di Sorso', selected: false },
    { name: 'Orosei', selected: false },
    { name: 'Palau', selected: false },
    { name: 'Pittulongu', selected: false },
    { name: 'Porto Cervo', selected: false },
    { name: 'Porto Istana', selected: false },
    { name: 'Porto Rotondo', selected: false },
    { name: 'Porto Taverna', selected: false },
    { name: 'Porto Torres', selected: false },
    { name: 'Portobello di Gallura', selected: false },
    { name: 'Posada', selected: false },
    { name: 'San Giovanniu di Posada', selected: false },
    { name: 'San Teodoro', selected: false },
    { name: 'Santa Teresa di Gallura', selected: false },
    { name: 'Siniscola', selected: false },
    { name: 'Stintino', selected: false },
    { name: 'Trinità D\'agultu - Isola Rossa', selected: false },
    { name: 'Valledoria', selected: false },
    { name: 'Viddalba', selected: false },
  ];
  public selectableAmenities: { code: string, name: string, selected: boolean }[] = [
    { code: 'sofa_bed', name: 'Divano letto', selected: false },
    { code: 'bidet', name: 'Bidet', selected: false },
    { code: 'hairdryer', name: 'Phon', selected: false },
    { code: 'refrigerator', name: 'Frigorifero', selected: false },
    { code: 'extra_pillows_and_blankets', name: 'Cuscini e coperte extra', selected: false },
    { code: 'hangers', name: 'Appendini', selected: false },
    { code: 'hot_water', name: 'Acqua calda', selected: false },
    { code: 'private_entrance', name: 'Ingresso privato', selected: false },
    { code: 'stove', name: 'Fornelli', selected: false },
    { code: 'washerdryer', name: 'Lavatrice/Asciugatrice', selected: false },
    { code: 'iron', name: 'Ferro da stiro', selected: false },
    { code: 'washer', name: 'Lavatrice', selected: false },
    { code: 'free_parking', name: 'Parcheggio gratuito', selected: false },
    { code: 'single_level_home', name: 'Casa a un livello', selected: false },
    { code: 'kitchen', name: 'Cucina', selected: false },
    { code: 'microwave', name: 'Forno a microonde', selected: false },
    { code: 'oven', name: 'Forno', selected: false },
    { code: 'dishes_and_silverware', name: 'Piatti e Argenteria', selected: false },
    { code: 'beach_view', name: 'Vista sulla spiaggia', selected: false },
    { code: 'long_term_stays_allowed', name: 'Soggiorni a lungo termine ammessi', selected: false },
    { code: 'tv', name: 'TV', selected: false },
    { code: 'garden', name: 'Giardino', selected: false },
    { code: 'bbq_area', name: 'Area barbecue', selected: false }
  ];
  
  @ViewChild('child') child?: HousecardsComponent;
  guests!: number | null;
  public houseName: string = '';


  constructor(private accommodationService : AccommodationService, private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle("AffittaSardegna - Ville, Case Vacanza ed Appartamenti in affitto in Sardegna vicino la spiaggia");
    this.metaTagService.updateTag({ name: 'description', content: 'Affittiamo Ville, Case Vacanza ed Appartamenti vicino le più belle spiagge della Sardegna, a Stintino, Cala Gonone e Costa Smeralda' });
    this.accommodationService.getAccommodations().subscribe((accommodations) => {
      this.originalAccommodations = accommodations;
      this.filterAccommodations();
    });
  }

  public loadMoreCards(): void {
    this.child?.loadMoreCards();
  }

  public onChange(selectedCity: string | null, selectedAmenity: string | null, guests: number|null): void {
    this.selectableCities.forEach((city) => {
      if (city.name === selectedCity) {
        city.selected = !city.selected;
      }
    });
  
    this.selectableAmenities.forEach((amenity) => {
      if (amenity.code === selectedAmenity) {
        amenity.selected = !amenity.selected;
      }
    }
    );
    
    const guestsInput = document.getElementById("guestsInput") as HTMLInputElement;
    this.guests = guestsInput.valueAsNumber;
    this.filterAccommodations();
  }

  private filterAccommodations(): void {
    this.accommodationService.getAccommodations().subscribe((accommodations) => {
      if (this.selectableCities.some((city) => city.selected) && this.selectableAmenities.some((amenity) => amenity.selected)) {
        this.allAccommodations = accommodations.filter((accommodation) => {
          const selectedAmenities = this.selectableAmenities.filter(amenity => amenity.selected);
          return this.selectableCities.some((city) => city.selected && city.name === accommodation.city) && 
                 selectedAmenities.every((amenity) => 
                   accommodation.amenities?.some(a => a.code === amenity.code)
                 ) &&
                 (!this.guests || parseInt(accommodation.guests || '0') === this.guests);
        });
      } else if (this.selectableCities.some((city) => city.selected)) {
        this.allAccommodations = accommodations.filter((accommodation) => {
          return this.selectableCities.some((city) => city.selected && city.name === accommodation.city) &&
                 (!this.guests || parseInt(accommodation.guests || '0') === this.guests);
        });
      } else if (this.selectableAmenities.some((amenity) => amenity.selected)) {
        this.allAccommodations = accommodations.filter((accommodation) => {
          const selectedAmenities = this.selectableAmenities.filter(amenity => amenity.selected);
          return selectedAmenities.every((amenity) => 
            accommodation.amenities?.some(a => a.code === amenity.code)
          ) &&
          (!this.guests || parseInt(accommodation.guests || '0') === this.guests);
        });
      } else {
        this.allAccommodations = accommodations.filter((accommodation) =>
          (!this.guests || parseInt(accommodation.guests || '0') === this.guests)
        );
      }
      console.log(this.allAccommodations);
    });
  }

  public onNameChange(event: any): void {
    this.houseName = (event.target as HTMLInputElement).value;
    this.filterAccommodationsByName();
  }

  private filterAccommodationsByName(): void {
    this.allAccommodations = this.originalAccommodations?.filter((accommodation) =>
      (!this.houseName) || accommodation.name_it?.toLowerCase().includes(this.houseName.toLowerCase())
    );
    console.log(this.allAccommodations);
  }
  
  
  

  
  
}
