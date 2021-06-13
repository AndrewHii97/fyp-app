import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging, private tokenService : TokenService) { }

  requestPermission(){
    this.angularFireMessaging.requestToken.subscribe(
      (token)=>{
        this.tokenService.updateUserToken(token, localStorage.getItem('id')).subscribe(
          (res)=>{
            console.log('token is updated to database');
          }
        )
        console.log(token);
      },
      (err)=>{
        console.error('Unable to get permission to notify');
      }
    )
  }

  receiveMessage(){
    this.angularFireMessaging.messages.subscribe(
      (payload: any)=>{
        console.log('new message recieved', payload);
        const NotificationOptions = { 
          body: payload.notification.body,
          data: payload.data,
        }
        navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope').then(registration => {
          registration.showNotification(payload.notification.title, NotificationOptions);
        })

        this.currentMessage.next(payload);
      }
    )
  }


}
