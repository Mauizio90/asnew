import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/layouts/footer/footer.component';
import { HeaderComponent } from './Components/layouts/header/header.component';
import { HousecardsComponent } from './Components/layouts/housecards/housecards.component';
import { AboutUsComponent } from './Components/pages/about-us/about-us.component';
import { ContactsComponent } from './Components/pages/contacts/contacts.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { LocationsComponent } from './Components/pages/locations/locations.component';
import { PrivacyComponent } from './Components/pages/privacy/privacy.component';
import { PropertiesSuggestionComponent } from './Components/pages/properties-suggestion/properties-suggestion.component';
import { TermsComponent } from './Components/pages/terms/terms.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AccommodationsComponent } from './Components/pages/accommodations/accommodations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupsubmissionsuccessComponent } from './Components/layouts/popupsubmissionsuccess/popupsubmissionsuccess.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SinglePageAccommodationComponent } from './Components/pages/single-page-accommodation/single-page-accommodation.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FontAwesomeModule,
        FooterComponent,
        HeaderComponent,
        HousecardsComponent,
        AboutUsComponent,
        AccommodationsComponent,
        ContactsComponent,
        HomeComponent,
        LocationsComponent,
        PrivacyComponent,
        PropertiesSuggestionComponent,
        TermsComponent,
        AccommodationsComponent,
        PopupsubmissionsuccessComponent,
        SinglePageAccommodationComponent,
    ],
    providers: [provideClientHydration()],
    bootstrap: [AppComponent]
})
export class AppModule { }
