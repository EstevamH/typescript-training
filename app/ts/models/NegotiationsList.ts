import { Negotiation } from "./Negotiation";

export class NegotiationsList {
    private _negotiations: Negotiation[] = []

    addToList(negotiation: Negotiation): void {
        this._negotiations.push(negotiation);
    }

    getList = (): Negotiation[] => [].concat(this._negotiations);
}