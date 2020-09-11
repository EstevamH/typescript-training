import { NegotiationsList, Negotiation, PartialNegotiation } from "../models/index";
import { NegotiationsView, MessageView } from "../views/index";
import { domInject, throttle } from "../helpers/decorators/index";
import { NegotiationService } from "../services/index";

enum DayOfTheWeek {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}

export class NegotiationController {

    @domInject('#date')
    private _inputDate: JQuery;

    @domInject('#quantity')
    private _inputQuantity: JQuery;

    @domInject('#value')
    private _inputValue: JQuery;

    private _negotiationsList = new NegotiationsList();
    private _negotiationsView = new NegotiationsView("#negotiationsView");
    private _messageView = new MessageView('#messageView');
    private _service = new NegotiationService();

    constructor() {
        this._negotiationsView.update(this._negotiationsList);
    }

    @throttle()
    addNegotiations() {

        let date = new Date(this._inputDate.val().replace(/-/g, ","));

        if (!this._businessDay(date)) {
            this._messageView.update('Somente negociações em dias úteis, por favor!');
            return;
        }

        const negotiation = new Negotiation(
            date,
            parseInt(this._inputQuantity.val()),
            parseFloat(this._inputValue.val())
        );
        this._negotiationsList.addToList(negotiation);
        this._negotiationsView.update(this._negotiationsList);
        this._messageView.update('Negociação adicionada com sucesso!');
    }

    @throttle()
    async importData() {
        try {
            const importNegotiations = await this._service
                .getNegotiations(res => {
                    if (res.ok) 
                        return res;
                    else 
                        throw new Error(res.statusText);                    
                });

            const importedNegotiations = this._negotiationsList.getList();

            importNegotiations
                .filter(negotiation =>
                    !importedNegotiations.some(imported => negotiation.equals(imported))
                )
                .forEach(
                    negotiation => this._negotiationsList.addToList(negotiation)
                );

            this._negotiationsView.update(this._negotiationsList);

        } catch (err) {
            this._messageView.update(err.message);
        }
    }

    private _businessDay = (date: Date) => date.getDay() != DayOfTheWeek.SATURDAY && date.getDay() != DayOfTheWeek.SUNDAY;
}
