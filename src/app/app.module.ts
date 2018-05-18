import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { GlobalSettings } from './global.settings';
import { MaterializeModule } from 'angular2-materialize';

//Global Services
import { RatioService } from './services/ratio.service';
import { PropertyService } from './services/property.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SynopticsComponent } from './components/synoptics/synoptics.component';
import { SynopticCardComponent } from './components/synoptic-card/synoptic-card.component';
import { SynopticAddComponent } from './components/synoptic-add/synoptic-add.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MenuComponent } from './components/menu/menu.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { HostDirective } from './directives/host.directive';
import { ThermometerComponent } from './components/thermometer/thermometer.component';
import { FanComponent } from './components/fan/fan.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { GaugeComponent } from './components/gauge/gauge.component';
import { ModalColorComponent } from './components/modal-color/modal-color.component';
import { ModalTextComponent } from './components/modal-text/modal-text.component';
import { LoaderComponent } from './components/loader/loader.component';
import { IndicatorPropertiesComponent } from './components/panel_properties/indicator-properties/indicator-properties.component';
import { SynopticPropertiesComponent } from './components/panel_properties/synoptic-properties/synoptic-properties.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ThermometerPropertiesComponent } from './components/panel_properties/thermometer-properties/thermometer-properties.component';
import { GeneratorPropertiesComponent } from './components/panel_properties/generator-properties/generator-properties.component';
import { GaugePropertiesComponent } from './components/panel_properties/gauge-properties/gauge-properties.component';
import { FanPropertiesComponent } from './components/panel_properties/fan-properties/fan-properties.component';
import { SynopticUpdateComponent } from './components/synoptic-update/synoptic-update.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ModalYesNoComponent } from './components/modal-yes-no/modal-yes-no.component';
import { ModalVoieComponent } from './components/modal-voie/modal-voie.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { AlwaysAuthGuard } from './guards/always-auth.guard';
import { routing } from './app.routing';
import { AccountService } from './services/account.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SynopticsComponent,
    SynopticCardComponent,
    SynopticAddComponent,
    WorkspaceComponent,
    MenuComponent,
    IndicatorComponent,
    ThermometerComponent,
    HostDirective,
    FanComponent,
    GeneratorComponent,
    GaugeComponent,
    ModalColorComponent,
    ModalTextComponent,
    LoaderComponent,
    IndicatorPropertiesComponent,
    SynopticPropertiesComponent,
    ChipsComponent,
    ThermometerPropertiesComponent,
    GeneratorPropertiesComponent,
    GaugePropertiesComponent,
    FanPropertiesComponent,
    SynopticUpdateComponent,
    PageNotFoundComponent,
    SynopticUpdateComponent,
    ModalYesNoComponent,
    ModalVoieComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule
   ,MaterializeModule
  ],
  providers: [GlobalSettings, RatioService, PropertyService, AlwaysAuthGuard, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
