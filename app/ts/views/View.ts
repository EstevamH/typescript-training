export abstract class View<T> {
    protected _element: JQuery;
    private _scape: boolean;

    constructor(selector: string, scape: boolean = false) {
        this._element = $(selector);
        this._scape = scape;
    }

    update(model: T): void {
        let template = this.template(model);

        if(this._scape) 
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');

        this._element.html(template);
    }

    abstract template(model: T): string;
}