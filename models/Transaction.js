import { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema({
    date: { type: Date, required: true },
    orderId: { type: String, required: true },
    transactionType: { type: String, required: true },
    channel: { type: String, required: true },
    status: { type: String, required: true },
    amount: { type: Number, required: true },
    customerEmail: { type: String, required: true }
});

export const Transaction = models?.Transaction || model('Transaction', TransactionSchema);

