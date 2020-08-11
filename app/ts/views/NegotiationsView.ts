import { View } from './View'
import { NegotiationsList } from '../models/NegotiationsList';

export class NegotiationsView extends View<NegotiationsList> {

    template(negotiationsList: NegotiationsList): string {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                    </tr>
                </thead>

                <tbody>
                    ${negotiationsList.getList().map(negotiation => 
                    `
                        <tr>
                            <td>${negotiation.date.getDate()}/${negotiation.date.getMonth() + 1}/${negotiation.date.getFullYear()}</td>
                            <td>${negotiation.quantity}</td>
                            <td>${negotiation.value}</td>
                            <td>${negotiation.volume}</td>
                        </tr>
                    `
                    ).join('')}
                </tbody>

                <tfoot></tfoot>
            </table>
        `;
    }
}