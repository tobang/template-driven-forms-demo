import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TabMenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public menuItems: MenuItem[] = [
    {
      label: 'Reactive form validation',
      routerLink: 'reactive-form-validation',
    },
    { label: 'Vest validation', routerLink: 'vest-validation' },
    { label: 'Async Vest validation', routerLink: 'async-vest-validation' },
  ];
}
