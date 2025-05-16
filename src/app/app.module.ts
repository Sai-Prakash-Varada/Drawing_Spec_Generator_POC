import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingSpecDocumentComponent } from './spec-generator/drawing-spec-document/drawing-spec-document.component';
import { ProductOptionsComponent } from './spec-generator/product-options/product-options.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule} from '@angular/forms';
import { CloButtonModule } from 'clopay-buttons';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DrawingSpecDocumentComponent,
    ProductOptionsComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    CloButtonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
    }),
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
