export function logRunTime(inSeconds: boolean = false) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {

            let divider = 1;
            let unity = 'milisegundos';

            if(inSeconds) {
                divider = 1000;
                unity = 'segundos';
            }

            console.log('-----------------------')
            console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);

            const t1 = performance.now();
            const response = originalMethod.apply(this, args);

            console.log(`Resultado do método: ${JSON.stringify(response)}`);
            const t2 = performance.now();

            console.log(`${propertyKey} demorou ${(t2 - t1)/divider} ${unity}`);
            console.log('-----------------------');

            return response;
        }

        return descriptor;
    }
}