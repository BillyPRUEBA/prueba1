import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BACKDROP } from '@ionic/core/dist/types/utils/overlays';
import { observable} from 'rxjs';

declare var mqtt: any;


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private client: any = null;
  public mensaje: string = '';

  constructor() {
    this.client = mqtt.connect('', {
      protocol: 'wss',
      host: 'soldier.cloudmqtt.com',
      port: 37997,
      path: '/mqtt',
      username: 'Prueba_mqtt',
      password: '0123456'
    });

    this.client.on('connect', () => {
      this.client.subscribe('mqtt', (ret: any) => console.log(ret));
      this.client.subscribe('message', (ret: any) => console.log(ret));
      this.client.subscribe('error', (ret: any) => console.error(ret));
    });
  }

  sendMessage() {
    // allowed topics: ensayo1 | potenciometro
    this.client.publish('ensayo1', this.mensaje);
  }
  
  enviarmensaje() { 
    this.client.publish('ensayo1','APAGADO');
  }

  enviareste(){
    this.client.publish('ensayo1','ENCENDIDO');
  }

  presentAlertConfirm() {
    const alert = document.createElement('ion-alert');
    alert.backdropDismiss = false;
    alert.translucent=true;
    alert.header = 'AVISO!';
    alert.message = 'Está a punto de entrar a modo manual';
    alert.buttons = [{
        text: 'Confirmar',
        handler: () => {
          console.log(this.client.publish('ensayo1','APAGADO'))
        }
    }
    ];
  
    document.body.appendChild(alert);
    return alert.present();
  }

  suscribirse(){
    this.client.subscribe('ensayo1');
  }
}