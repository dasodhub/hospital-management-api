exports.generatePatientId = () => {
  return `PAT-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

exports.generateInvoiceNumber = () => {
  return `INV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};
