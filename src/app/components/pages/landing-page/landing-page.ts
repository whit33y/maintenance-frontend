import { Component } from '@angular/core';
import { Cta } from '../../elements/cta/cta';
import { FooterLanding } from '../../elements/footer-landing/footer-landing';
import { LpHeader } from '../../elements/lp-header/lp-header';

@Component({
  selector: 'app-landing-page',
  imports: [Cta, FooterLanding, LpHeader],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {}
