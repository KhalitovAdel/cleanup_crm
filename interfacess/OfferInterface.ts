export interface Offer {
        leadLink: String,
        area: Number,
        regular: Number,
        time: Number,
        twice: Boolean,
        status: String,
        createdDate: Date,
        sentingDate: Date,
        details: {
            whiteFot: Number,
            blackFot: Number,
            fotOnHand: Number,
            zpNalog: Object,
            itog: Number,
            itogMaterial: Number,
            managerWage: Number,
            material: Number,
            profit: Number,
            tinkoffCommission: Number,
            windowFond: Number,
        }
}

export class OfferInterface implements Offer {
    leadLink: String;    area: Number;
    regular: Number;
    time: Number;
    twice: Boolean;
    status: String;
    createdDate: Date;
    sentingDate: Date;
    details: { whiteFot: Number; blackFot: Number; fotOnHand: Number; zpNalog: Object; itog: Number; itogMaterial: Number; managerWage: Number; material: Number; profit: Number; tinkoffCommission: Number; windowFond: Number; };


}