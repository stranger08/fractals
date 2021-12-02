import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- JavaScript import from 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerCircularModule } from 'spinners-angular/spinner-circular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KochFractalComponent } from './koch-fractal/koch-fractal.component';
import { TriangleTransformationsComponent } from './triangle-transformations/triangle-transformations.component';
import { TriangleInputPanelComponent } from './triangle-input-panel/triangle-input-panel.component';
import { TransformationInputPanelComponent } from './transformation-input-panel/transformation-input-panel.component';
import { GroupTransformationsComponent } from './group-transformations/group-transformations.component';
import { LSystemsComponent } from './l-systems/l-systems.component';

@NgModule({
  declarations: [
    AppComponent,
    KochFractalComponent,
    TriangleTransformationsComponent,
    TriangleInputPanelComponent,
    TransformationInputPanelComponent,
    GroupTransformationsComponent,
    LSystemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    SpinnerCircularModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
