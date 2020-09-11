/* Decorator para injetar um seletor do dom em uma propriedade como lazyLoading (apenas quando a propriedade for acessada) */
export function domInject(selector: string) {

    return function(target: any, key: string) {

        let element: JQuery;

        const getter = function() {

            if(!element) 
                element = $(selector);            

            return element;
        }

       Object.defineProperty(target, key, {
           get: getter
       });
    }
}