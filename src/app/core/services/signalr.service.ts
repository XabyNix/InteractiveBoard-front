import * as signalR from "@microsoft/signalr";
import {LogLevel} from "@microsoft/signalr";
import {Stroke} from '../../shared/models/stroke.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Point} from '../../shared/models/point.model';

@Injectable({providedIn: 'root'})
export class SignalRService{

  private hubConnection: signalR.HubConnection;
  private strokeReceived$ = new Subject<Stroke>;
  public pointReceived$ = new Subject<Point>();
  public clearReceived$ = new Subject<void>();


  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5281/hub/stroke")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Debug)
      .build();

    this.StartConnection();
    this.registerEvents();
    this.receivePoint();
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

  public sendClear(){
      this.hubConnection.invoke("Clear")
        .then(() => {
            console.log("SignalR send clear sent");
        })
        .catch(err => console.error("SignalR send clear error", err));
  }

}
