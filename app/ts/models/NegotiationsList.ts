import { Negotiation } from "./Negotiation";

export class NegotiationsList {
    private _negotiations: Negotiation[] = []

    addToList(negotiation: Negotiation): void {
        this._negotiations.push(negotiation);
    }

    getList = (): Negotiation[] => ([] as Negotiation[]).concat(this._negotiations);

    equals(negotiations: NegotiationsList): boolean {
        return JSON.stringify(this._negotiations) == JSON.stringify(negotiations.getList());
    }
}