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
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
