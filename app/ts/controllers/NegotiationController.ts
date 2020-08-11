import { NegotiationsList, Negotiation } from "../models/index";
import { NegotiationsView, MessageView } from "../views/index";

export class NegotiationController {
    private _inputDate: JQuery;
    private _inputQuantity: JQuery;
    private _inputValue: JQuery;
    private _negotiationsList = new NegotiationsList();
    private _negotiationsView = new NegotiationsView("#negotiationsView");
    private _messageView = new MessageView('#messageView')

    constructor() {
        this._inputDate = $("#date");
        this._inputQuantity = $("#quantity");
        this._inputValue = $("#value");
        this._negotiationsView.update(this._negotiationsList);
    }

    addNegotiations(event: Event) {
        event.preventDefault();

        const negotiation = new Negotiation(
            new Date(this._inputDate.val().replace(/-/g, ",")),
            parseInt(this._inputQuantity.val()),
            parseFloat(this._inputValue.val())
        );
        this._negotiationsList.addToList(negotiation);
        this._negotiationsView.update(this._negotiationsList);
        this._messageView.update('Negociação adicionada com sucesso!');
    }
}
