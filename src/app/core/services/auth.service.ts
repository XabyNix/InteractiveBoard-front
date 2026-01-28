import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from '../../shared/models/Auth/token-response.model';
import {map, shareReplay} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {
  }
  private baseUrl = environment.apiUrl;

  getAccessToken(){
    return this.http.post<TokenResponse>(`${this.baseUrl}/auth/token`, {
      clientId: environment.clientId,
      clientSecret: environment.clientSecret,
    }).pipe(
      map(res => res.accessToken),
      shareReplay(1)
    );
  }

}
