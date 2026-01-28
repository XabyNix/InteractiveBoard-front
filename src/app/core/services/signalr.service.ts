import * as signalR from "@microsoft/signalr";
import {LogLevel} from "@microsoft/signalr";
import {Stroke} from '../../shared/models/stroke.model';
import {lastValueFrom, Subject} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {Point} from '../../shared/models/point.model';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class SignalRService{

  private readonly authService = inject(AuthService);

  private hubConnection: signalR.HubConnection;
  private strokeReceived$ = new Subject<Stroke>;
  public pointReceived$ = new Subject<Point>();
  public pointsReceived$ = new Subject<Point[]>();
  public clearReceived$ = new Subject<void>();


  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/hub/stroke`, {
        accessTokenFactory: () => lastValueFrom(this.authService.getAccessToken())
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Debug)
      .build();

    this.StartConnection();
    this.registerEvents();
    this.receivePoint();
    this.receivePoints();
    this.receiveClear();

  }

  private StartConnection(){
    this.hubConnection.start()
      .then(() => console.log("SignalRService started"))
      .catch(err => console.error("SignalR connection error", err));
  }

  private registerEvents(){
      this.hubConnection.on("ReceiveStroke", (stroke: Stroke)=> {
        console.log("---Stroke Received---", stroke)
        this.strokeReceived$.next(stroke);
      })
  }

  private receivePoint(){
    this.hubConnection.on("ReceivePoint", (point: Point)=> {
      this.pointReceived$.next(point);
    })
  }

  private receivePoints(){
    this.hubConnection.on("ReceivePointList", (point: Point[])=> {
      this.pointsReceived$.next(point);
    })
  }

  private receiveClear(){
    this.hubConnection.on("Clear", ()=> {
      this.clearReceived$.next();
    })
  }

  public sendStroke(stroke: Stroke){
      this.hubConnection.invoke("SendStroke", stroke)
        .catch(err => console.error("SignalR send stroke error", err.toString()));
  }

  public sendPoint(point: Point){
    this.hubConnection.invoke("SendPoint", point)
      .catch(err => console.error("SignalR send point error", err.toString()));
  }

  public sendPoints(points: Point[]){
    this.hubConnection.invoke("SendPointList", points)
      .then(() => console.log("sendEvent"))
      .catch(err => console.error("SignalR send points error", err.toString()));
  }

  public sendClear(){
      this.hubConnection.invoke("Clear")
        .then(() => {
            console.log("SignalR send clear sent");
        })
        .catch(err => console.error("SignalR send clear error", err));
  }

}
