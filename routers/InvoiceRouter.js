import express from "express";
import expressAsyncHandler from "express-async-handler";
import InvoiceList from "../Models/InvoiceModels.js";
import fs from 'fs';
import pdf from 'dynamic-html-pdf';
import upload from "../middleware/image.js";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
// import hbs from 'hbs';
// import htmlPDF from 'puppeteer-html-pdf';
// import readFile = require('util').promisify(fs.readFile);



const InvoiceRouter = express.Router();

InvoiceRouter.get('/downloadCurrent',
  expressAsyncHandler(async (req, res) => {
    const item = await InvoiceList.find()
    if (item) {
      res.send(item)
    }
  }))

InvoiceRouter.post(
  "/invo", upload.single("image"), async (req, res) => {
    if (req.file == undefined) {
      const category = new InvoiceList({
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
        totalvalue: req.body.totalvalue
      });
      console.log("category", category);
      const createdCategory = await category.save();
      res.send({ message: 'Product Created', category: createdCategory });
    } else {
      const category = new InvoiceList({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        path: req.file.path,
        filename: req.file.filename,
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
        totalvalue: req.body.totalvalue
      });
      console.log("category", category);
      const createdCategory = await category.save();
      res.send({ message: 'Product Created', category: createdCategory });
    }

  });

InvoiceRouter.get('/downloadALLPDF', expressAsyncHandler(async (req, response) => {
  // console.log("req0", req);
  // const users = await InvoiceList.find().sort({ createdAt: -1 }).limit(1)
  var users = [
    {

      invoicefrom: 'invoice Form',
      billto: 'Bill To',
      shipto: 'Ship to',
      invoiceto: 'billto',
      optional: 'shipto',
      invoice: 'Invoice',
      invoicesmal: 'invoice1',
      date: 'Date',
      datevalue: '10-04-2023',
      payment: 'Payment Terms',
      paymentvalue: 'ok',
      duedate: 'Daue Date',
      duedatevalue: '20-04-2023',
      ponumber: 'PO Number',
      ponumbervalue: '123456789',
      tablelist: [
        { Desc: 'test1', qty: '10', Rating: '50', Amount: '60' },
        { Desc: 'test2', qty: '20', Rating: '30', Amount: '40' },
        { Desc: 'test3', qty: '80', Rating: '90', Amount: '100' },
        { Desc: 'test5', qty: '20', Rating: '40', Amount: '60' }
      ],
      notes: 'Notes',
      noterelavent: 'nost item',
      terms: 'Terms',
      termscon: 'terms item',
      subTotal: 'subTotal',
      discount: 'Discount',
      disvalue: '200',
      tax: 'Tax',
      taxvalue: '300',
      shipping: 'Shipping',
      shippingvalue: '400',
      total: 'Total',
      amountpaid: 'Amount Paid',
      paidvalue: '600',
      balencedue: 'Balance Due',
      tableinvoice: 'Invoice',
      tableqty: 'Quanty',
      tablerating: 'Rating',
      tableamount: 'Amount',
      subvalue: '100',
      duevalue: '700',
      totalvalue: '500',
    },
  ]

  let tables
  for (let i = 0; i < users.length; i++) {
    tables = users[i].tablelist
  }

  var html = fs.readFileSync("Create template.html", "utf8");
  var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
  };



  var document = {
    type: 'buffer',     // 'file' or 'buffer'
    template: html,
    context: {
      users: users,
      tables: tables
    },
    path: "./output.pdf"    // it is not required if type is buffer
  };
  pdf.create(document, options)
    .then(res => {
      response.send(res)
      console.log("Get All Invoice Pdf trueeee")
    })
    .catch(error => {
      console.error(error)
    });


}));



export default InvoiceRouter;
