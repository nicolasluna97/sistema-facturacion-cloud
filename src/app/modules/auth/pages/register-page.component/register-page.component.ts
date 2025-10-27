import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register-page.component',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent { }
