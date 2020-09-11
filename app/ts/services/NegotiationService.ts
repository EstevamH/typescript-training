import { PartialNegotiation, Negotiation } from "../models/index";

export class NegotiationService {

    getNegotiations(handler: ResponseHandler): Promise<Negotiation[]> {

        return <Promise<Negotiation[]>> fetch('http://localhost:8080/dados')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: PartialNegotiation[]) => 
                dados.map(dado => new Negotiation(new Date(), dado.vezes, dado.montante))
            )
        .catch(err => {
            console.log(err);
            throw new Error('Não foi possível importar as negociações');
        });
    }
}

export interface ResponseHandler {
    (res: Response): Response
}