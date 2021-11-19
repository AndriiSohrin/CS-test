import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

import {OwnerEntity} from "../models/ownerEntity";



@Injectable({
  providedIn: 'root'
})
export class CarOwnerService {

  constructor(private http: HttpClient) {}

  get(url: string): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(url).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  create(url: string, product: any): Observable<OwnerEntity> {
    product.id = null;
    return this.http.post<any>(url, product).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  edit(url: string, product: any): Observable<any> {
    return this.http.put(url + product.id, product);
  }

  delete(url: string,id: number): Observable<any> {
    return this.http.delete(url + id);
  }
}
