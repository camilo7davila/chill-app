import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private afs: AngularFirestore) { }

  getQrCodeById(idQr: string) {
    return this.afs.doc('QRCode/' + idQr).valueChanges();
  }
}
