import { NegotiationController } from "./controllers/NegotiationController";

const controller = new NegotiationController();

$('.form').submit(controller.addNegotiations.bind(controller));
$('#import').click(controller.importData.bind(controller));