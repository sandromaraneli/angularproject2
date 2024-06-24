import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'https://restaurant.stepprojects.ge/api';

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Products/GetAll`);
  }

  getMenuItemDetails(id: number): Observable<any> {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.apiUrl}/Products/GetFiltered`, { params }).pipe(
      map((response: any) => response[0])  
    );
  }

  filterMenuItems(minPrice: number, maxPrice: number, id?: number): Observable<any> {
    let params = new HttpParams();
    if (minPrice !== undefined && minPrice !== null) params = params.append('minPrice', minPrice.toString());
    if (maxPrice !== undefined && maxPrice !== null) params = params.append('maxPrice', maxPrice.toString());
    if (id !== undefined && id !== null) params = params.append('id', id.toString());
    return this.http.get(`${this.apiUrl}/Products/GetAll`, { params });
  }
}

