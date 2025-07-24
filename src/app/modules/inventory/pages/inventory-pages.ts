import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidenav } from "../../../core/sidenav/sidenav";
import { Navbar } from '../../../core/navbar/navbar';


@Component({
  selector: 'app-inventory-pages',
  imports: [Sidenav, Navbar],
  templateUrl: './inventory-pages.html',
  styleUrl: './inventory-pages.css'
})

export class InventoryPages {

}
