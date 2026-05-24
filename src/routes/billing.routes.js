const router = require("express").Router();

const billingController = require("../controllers/billing.controller");
const auth = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createBillingSchema,
  payBillingSchema,
} = require("../validations/billing.validation");

router.post(
  "/",
  auth,
  allowRoles("admin", "billing_officer"),
  validate(createBillingSchema),
  billingController.createBilling
);

router.get(
  "/",
  auth,
  allowRoles("admin", "billing_officer"),
  billingController.getBillings
);

router.get(
  "/:id",
  auth,
  allowRoles("admin", "billing_officer"),
  billingController.getBillingById
);

router.patch(
  "/:id/pay",
  auth,
  allowRoles("admin", "billing_officer"),
  validate(payBillingSchema),
  billingController.markAsPaid
);

module.exports = router;
