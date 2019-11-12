import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action } from '@types';

@Injectable()
export class ActionListService {

  constructor(private http: HttpClient) { }

  getAllActions(): Observable<Action[]> {
    return this.http.get<Action[]>('/api/actions/all');
  }
}
