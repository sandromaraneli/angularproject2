import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.css']
})
export class MenuItemDetailsComponent implements OnInit {
  menuItem: any;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.menuItem = null;  
      console.log('Fetching details for menu item with ID:', id); 
      this.restaurantService.getMenuItemDetails(id).subscribe(data => {
        console.log('Fetched menu item details:', data);
        this.menuItem = data;
      }, error => {
        console.error('Error fetching menu item details:', error);
      });
    });
  }
}

