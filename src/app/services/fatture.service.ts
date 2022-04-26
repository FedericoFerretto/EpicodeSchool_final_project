import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Clienti } from '../clienti/clienti';
import { Fattura, StatoFattura } from '../fatture/fatture';
import { ClientiService } from './clienti.service';

@Injectable({
  providedIn: 'root'
})
export class FattureService {

  constructor(private http: HttpClient, private clientiSrv: ClientiService) { }

  getAllFatture(page: number) {
    return this.http.get<any>(`${environment.baseUrl}/api/fatture?page=${page}&sort=id,ASC`);
  }

  getFattureByCliente(id: number, page: number) {
    return this.http.get<any>(`${environment.baseUrl}/api/fatture/cliente/${id}?page=${page}&sort=id,ASC`);
  }

  getFattureById(id: number) {
    return this.http.get<any>(`${environment.baseUrl}/api/fatture/${id}`);
  }

  getTipoStatoFatturabyId(id: number) {
    return this.http.get<StatoFattura>(`${environment.baseUrl}/api/statifattura/${id}`);
  }

  deleteFattura(id: number) {
    return this.http.delete(`${environment.baseUrl}/api/fatture/${id}`);
  }

  async fatturaForm(data: Partial<Fattura>, id: number, idFattura: number) {
    console.log('service',data);

    let cliente = await this.clientiSrv.getClienteById(id).toPromise() as Clienti;
    let getStato = await this.getTipoStatoFatturabyId(Number(data.stato)).toPromise() as StatoFattura;

    const fattData: Fattura | unknown = {
      data: data.data,
      numero: data.numero,
      anno: data.anno,
      importo: data.importo,
      stato: getStato,
      cliente: {
        id: cliente.id,
        ragioneSociale: cliente.ragioneSociale,
        partitaIva: cliente.partitaIva,
        tipoCliente: cliente.tipoCliente,
        email: cliente.email,
        pec: cliente.pec,
        telefono: cliente.telefono,
        nomeContatto: cliente.nomeContatto,
        cognomeContatto: cliente.cognomeContatto,
        telefonoContatto: cliente.telefonoContatto,
        emailContatto: cliente.emailContatto,
        indirizzoSedeOperativa: {
          via: cliente.indirizzoSedeOperativa?.via,
          civico: cliente.indirizzoSedeOperativa?.civico,
          cap: cliente.indirizzoSedeOperativa?.cap,
          localita: cliente.indirizzoSedeOperativa?.localita,
          comune: {
            id: cliente.indirizzoSedeOperativa.comune.id,
            nome: cliente.indirizzoSedeOperativa.comune.nome,
            provincia: {
              id: cliente.indirizzoSedeOperativa.comune.provincia.id,
              nome: cliente.indirizzoSedeOperativa.comune.provincia.nome,
              sigla: cliente.indirizzoSedeOperativa.comune.provincia.sigla
            }
          }
        },
        indirizzoSedeLegale: cliente.indirizzoSedeLegale ? {
          via: cliente.indirizzoSedeLegale?.via ? cliente.indirizzoSedeLegale?.via : null,
          civico: cliente.indirizzoSedeLegale?.civico ? cliente.indirizzoSedeLegale?.civico : null,
          cap: cliente.indirizzoSedeLegale?.cap ? cliente.indirizzoSedeLegale?.cap : null,
          localita: cliente.indirizzoSedeLegale?.localita ? cliente.indirizzoSedeLegale?.localita : null,
          comune: cliente.indirizzoSedeLegale.comune ? {
            id: cliente.indirizzoSedeLegale.comune.id ? cliente.indirizzoSedeLegale.comune.id : null,
            nome: cliente.indirizzoSedeLegale.comune.nome ? cliente.indirizzoSedeLegale.comune.nome : null,
            provincia: cliente.indirizzoSedeLegale.comune.provincia ? {
              id: cliente.indirizzoSedeLegale.comune.provincia.id ? cliente.indirizzoSedeLegale.comune.provincia.id : null,
              nome: cliente.indirizzoSedeLegale.comune.provincia.nome ? cliente.indirizzoSedeLegale.comune.provincia.nome : null,
              sigla: cliente.indirizzoSedeLegale.comune.provincia.sigla ? cliente.indirizzoSedeLegale.comune.provincia.sigla: null
            } : null
          } : null
        } : null
      },
      dataInserimento: new Date().toISOString().slice(0, 10),
      dataUltimoContatto: new Date().toISOString().slice(0, 10),
      fatturatoAnnuale: (Math.random() * (10000 - 1000) + 1000).toFixed(2)
    }

    console.log(fattData);

    if(idFattura == 0) {
      return this.http.post<Fattura>(`${environment.baseUrl}/api/fatture`, fattData).subscribe();
    } else {
      return this.http.put<Fattura>(`${environment.baseUrl}/api/fatture/${idFattura}`, fattData).subscribe();
    }
  }
}
