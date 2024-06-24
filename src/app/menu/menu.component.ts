import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  minPrice: number | null = null;
  maxPrice: number | null = null;
  searchId: number | null = null;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.loading = true;
    this.restaurantService.getMenuItems().subscribe(data => {
      this.menuItems = data;
      this.loading = false;
    }, error => {
      this.errorMessage = 'Failed to load menu items. Please try again later.';
      this.loading = false;
    });
  }

  filterMenuItems(): void {
    this.loading = true;
    let minPrice = this.minPrice ?? 0;
    let maxPrice = this.maxPrice ?? Number.MAX_SAFE_INTEGER;
    let searchId = this.searchId !== null ? this.searchId : undefined;

    this.restaurantService.filterMenuItems(minPrice, maxPrice, searchId).subscribe(data => {
      console.log('Filtered menu items:', data); 
      this.menuItems = data;
      this.loading = false;
    }, error => {
      this.errorMessage = 'Failed to filter menu items. Please try again later.';
      this.loading = false;
    });
  }
}




