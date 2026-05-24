const Billing = require("../models/Billing");
const Patient = require("../models/Patient");
const { generateInvoiceNumber } = require("../utils/generateId");

exports.createBilling = async (payload) => {
  const patient = await Patient.findById(payload.patient);

  if (!patient) {
    const error = new Error("Patient not found");
    error.statusCode = 404;
    throw error;
  }

  const totalAmount = payload.items.reduce((total, item) => {
    return total + Number(item.amount);
  }, 0);

  return Billing.create({
    ...payload,
    invoiceNumber: generateInvoiceNumber(),
    totalAmount,
  });
};

exports.getBillings = async () => {
  return Billing.find()
    .populate("patient")
    .populate("appointment")
    .populate("consultation")
    .sort({ createdAt: -1 });
};

exports.getBillingById = async (id) => {
  const billing = await Billing.findById(id)
    .populate("patient")
    .populate("appointment")
    .populate("consultation");

  if (!billing) {
    const error = new Error("Billing record not found");
    error.statusCode = 404;
    throw error;
  }

  return billing;
};

exports.markAsPaid = async (id, paymentMethod) => {
  const billing = await Billing.findById(id);

  if (!billing) {
    const error = new Error("Billing record not found");
    error.statusCode = 404;
    throw error;
  }

  if (billing.paymentStatus === "paid") {
    const error = new Error("This bill has already been paid");
    error.statusCode = 400;
    throw error;
  }

  billing.paymentStatus = "paid";
  billing.paymentMethod = paymentMethod;
  billing.paidAt = new Date();

  await billing.save();

  return billing;
};
