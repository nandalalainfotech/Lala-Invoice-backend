import mongoose from 'mongoose';
const invoiceSchema = new mongoose.Schema(

    {
        invoicefrom: { type: String, required: false },
        billto: { type: String, required: false },
        shipto: { type: String, required: false },
        invoiceto: { type: String, required: false },
        optional: { type: String, required: false },
        invoice: { type: String, required: false },
        invoicesmal: { type: String, required: false },
        date: { type: String, required: false },
        datevalue: { type: String, required: false },
        payment: { type: String, required: false },
        paymentvalue: { type: String, required: false },
        duedate: { type: String, required: false },
        duedatevalue: { type: String, required: false },
        ponumber: { type: String, required: false },
        ponumbervalue: { type: String, required: false },
        tablelist: [],
        notes: { type: String, required: false },
        noterelavent: { type: String, required: false },
        terms: { type: String, required: false },
        termscon: { type: String, required: false },
        subTotal: { type: String, required: false },
        discount: { type: String, required: false },
        disvalue: { type: String, required: false },
        tax: { type: String, required: false },
        taxvalue: { type: String, required: false },
        shipping: { type: String, required: false },
        shippingvalue: { type: String, required: false },
        total: { type: String, required: false },
        amountpaid: { type: String, required: false },
        paidvalue: { type: String, required: false },
        balencedue: { type: String, required: false },
        tableinvoice: { type: String, required: false },
        tableqty: { type: String, required: false },
        tablerating: { type: String, required: false },
        tableamount: { type: String, required: false },
        subvalue: { type: String, required: false },
        duevalue: { type: String, required: false },
        totalvalue: { type: String, required: false },
    },
    {
        timestamps: true,
    },

);




const InvoiceList = mongoose.model('InvoiceList', invoiceSchema);

export default InvoiceList;