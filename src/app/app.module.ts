import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- JavaScript import from 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KochFractalComponent } from './koch-fractal/koch-fractal.component';
import { TriangleTransformationsComponent } from './triangle-transformations/triangle-transformations.component';
import { TriangleInputPanelComponent } from './triangle-input-panel/triangle-input-panel.component';
import { TransformationInputPanelComponent } from './transformation-input-panel/transformation-input-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    KochFractalComponent,
    TriangleTransformationsComponent,
    TriangleInputPanelComponent,
    TransformationInputPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
