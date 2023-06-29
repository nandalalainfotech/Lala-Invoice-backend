import pdf from "dynamic-html-pdf";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import fs from "fs";
import InvoiceList from "../Models/InvoiceModels.js";
import upload from "../middleware/image.js";

import { createReadStream } from "fs";

const InvoiceRouter = express.Router();

InvoiceRouter.get(
  "/downloadCurrent",
  expressAsyncHandler(async (req, res) => {
    const item = await InvoiceList.find();
    if (item) {
      res.send(item);
    }
  })
);

InvoiceRouter.post(
  "/invo",
  expressAsyncHandler(async (req, res) => {

    const category = new InvoiceList({
      image: req.body.image,
      invoicefrom: req.body.Invoicefrom,
      invoicefrom: req.body.Invoicefrom,
      billto: req.body.billto,
      shipto: req.body.Shipto,
      invoiceto: req.body.Invoiceto,
      optional: req.body.Optional,
      invoice: req.body.Invoice,
      invoicesmal: req.body.Invoicesmal,
      date: req.body.Date,
      datevalue: req.body.Datevalue,
      payment: req.body.Payment,
      paymentvalue: req.body.Paymentvalue,
      duedate: req.body.Duedate,
      duedatevalue: req.body.Duedatevalue,
      ponumber: req.body.Ponumber,
      ponumbervalue: req.body.Ponumbervalue,
      tablelist: req.body.tablelist,
      notes: req.body.Notes,
      noterelavent: req.body.Noterelavent,
      terms: req.body.Terms,
      termscon: req.body.Termscon,
      subTotal: req.body.subTotal,
      discount: req.body.Discount,
      disvalue: req.body.Disvalue,
      tax: req.body.Tax,
      taxvalue: req.body.Taxvalue,
      shipping: req.body.Shipping,
      shippingvalue: req.body.Shippingvalue,
      total: req.body.Total,
      amountpaid: req.body.Amountpaid,
      paidvalue: req.body.Paidvalue,
      balencedue: req.body.Balencedue,
      tableinvoice: req.body.tableinvoice,
      tableqty: req.body.tableqty,
      tablerating: req.body.tablerating,
      tableamount: req.body.tableamount,
      subvalue: req.body.Subvalue,
      duevalue: req.body.duevalue,
      totalvalue: req.body.totalvalue,
    });
    const createdCategory = await category.save();
    res.send({ message: "Product Created", category: createdCategory });
  })
);

InvoiceRouter.get(
  "/downloadALLPDF",
  expressAsyncHandler(async (req, response) => {
    var usersDetails = await InvoiceList.find();


    var html = fs.readFileSync("Create-template.html", "utf8");
    var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
    };

    let data = [];

    for (let usersDetail of usersDetails) {
      let invoicedata = {};
      invoicedata.image = usersDetail.image;
      invoicedata.balencedue = usersDetail.balencedue;
      invoicedata.invoicefrom = usersDetail.invoicefrom;
      invoicedata.billto = usersDetail.billto;
      invoicedata.shipto = usersDetail.shipto;
      invoicedata.invoiceto = usersDetail.invoiceto;
      invoicedata.optional = usersDetail.optional;
      invoicedata.invoice = usersDetail.invoice;
      invoicedata.invoicesmal = usersDetail.invoicesmal;
      invoicedata.date = usersDetail.date;
      invoicedata.datevalue = usersDetail.datevalue;
      invoicedata.payment = usersDetail.payment;
      invoicedata.paymentvalue = usersDetail.paymentvalue;
      invoicedata.duedate = usersDetail.duedate;
      invoicedata.duedatevalue = usersDetail.duedatevalue;
      invoicedata.ponumber = usersDetail.ponumber;
      invoicedata.ponumbervalue = usersDetail.ponumbervalue;
      invoicedata.notes = usersDetail.notes;
      invoicedata.noterelavent = usersDetail.noterelavent;
      invoicedata.terms = usersDetail.terms;
      invoicedata.termscon = usersDetail.termscon;
      invoicedata.subTotal = usersDetail.subTotal;
      invoicedata.discount = usersDetail.discount;
      invoicedata.disvalue = usersDetail.disvalue;
      invoicedata.tax = usersDetail.tax;
      invoicedata.taxvalue = usersDetail.taxvalue;
      invoicedata.shipping = usersDetail.shipping;
      invoicedata.shippingvalue = usersDetail.shippingvalue;
      invoicedata.total = usersDetail.total;
      invoicedata.amountpaid = usersDetail.amountpaid;
      invoicedata.paidvalue = usersDetail.paidvalue;
      invoicedata.balencedue = usersDetail.balencedue;
      invoicedata.tableinvoice = usersDetail.tableinvoice;
      invoicedata.tableqty = usersDetail.tableqty;
      invoicedata.tablerating = usersDetail.tablerating;
      invoicedata.tableamount = usersDetail.tableamount;
      invoicedata.subvalue = usersDetail.subvalue;
      invoicedata.duevalue = usersDetail.duevalue;
      invoicedata.totalvalue = usersDetail.totalvalue;
      invoicedata.tableqty = usersDetail.tableqty;
      invoicedata.tablerating = usersDetail.tablerating;
      invoicedata.tablelist = usersDetail.tablelist;
      data.push(invoicedata);
    }

   

    let data1 = [];
    data1.push(data[data.length-1]);
    let tables;
    for (let i = 0; i < data1.length; i++) {
      tables = data1[i].tablelist;
    }
   
    var document = {
      type: "file", // 'file' or 'buffer'
      template: html,
      context: {
        invoice: data1,
        tables: tables,
      },
      path: "./output.pdf", // it is not required if type is buffer
    };
    if (data.length === 0) {
      return null;
    } else {
      await pdf
        .create(document, options)
        .then((pathRes) => {
          const filestream = createReadStream(pathRes.filename);
          response.writeHead(200, {
            "Content-Disposition": "attachment;filename=" + "purchasSlips.pdf",
            "Content-Type": "application/pdf",
          });
          filestream.pipe(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  })
);

export default InvoiceRouter;
