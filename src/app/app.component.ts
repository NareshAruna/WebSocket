import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private serverUrl = 'http://localhost:8080/socket';
  private title = 'Websocket Demo';
  private stompClient;
  private case;

  constructor(){
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          $(".message").remove();
          var case1 = JSON.parse(message.body);
          $(".chat").append("<div class='message'>"+case1.cusip+"</div>")
                    .append("<div class='message'>"+case1.date+"</div>")
                    .append("<div class='message'>"+case1.marketAction+"</div>")
          console.log(message.body);
        }
      });
    });
  }

  //sendMessage(message){
   // this.stompClient.send("/app/send/message2" , {}, message);
  //  $('#input').val('');
 //}

}


