import { Component } from '@angular/core';
import { Cta } from '../../elements/cta/cta';
import { FooterLanding } from '../../elements/footer-landing/footer-landing';
import { LpHeader } from '../../elements/lp-header/lp-header';

@Component({
  selector: 'app-start-page',
  imports: [Cta, FooterLanding, LpHeader],
  templateUrl: './start-page.html',
  styleUrl: './start-page.css',
})
export class StartPage {}
