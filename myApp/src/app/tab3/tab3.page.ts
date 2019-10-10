import {Component, OnInit} from '@angular/core';
import {Paho} from 'ng2-mqtt/mqttws31';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  Lumenes1: Number;
  Lumenes2: Number;
  prueba: "hola";
  private client;

  mqttbroker = 'soldier.cloudmqtt.com';

    ngOnInit() {
      this.client = new Paho.MQTT.Client(this.mqttbroker,Number(37997), "Lumenes");
      this.client.onMessageArrived = this.onMessageArrived.bind(this);
      this.client.onConnectionLost = this.onConnectionLost.bind(this);
      this.client.connect({onSuccess: this.onConnect.bind(this)});
    }

  onConnect() {
    console.log("onConnect");
    this.client.subscribe("/Lumenes");
    this.client.subscribe("Prueba_mqtt/Lumenes");
  }

  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }

  onMessageArrived(message) { 
    console.log('onMessageArrived: ' + message.destinationName + ': ' + message.payloadString);

    if (message.destinationName.indexOf('Lumenes') !== -1) {
      this.Lumenes1 = Number(message.payloadString);
    }

    if (message.destinationName.indexOf('Prueba_mqtt/Lumenes') !== -1) {
      this.Lumenes2 = Number(message.payloadString);
    }

  }
  color(){
    
  }
}
