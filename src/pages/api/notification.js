import mongooseConnect from '../../../lib/mongoose';
import { User } from '../../../models/User';
import { Transaction } from '../../../models/Transaction';
import midtransClient from 'midtrans-client';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'POST') {
        const apiClient = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
            clientKey: process.env.MIDTRANS_CLIENT_KEY
        });

        try {
            const notificationJson = req.body;
            const statusResponse = await apiClient.transaction.notification(notificationJson);

            const orderId = statusResponse.order_id;
            const transactionStatus = req.body.status || statusResponse.transaction_status;
            const fraudStatus = statusResponse.fraud_status;
            const paymentType = statusResponse.payment_type;

            // Extract the user ID from the order_id
            const userId = orderId.split('-')[1];

            const updateData = { status: transactionStatus, channel: paymentType };

            if (transactionStatus === 'capture' && fraudStatus === 'accept') {
                // Update subscription status
                await User.findByIdAndUpdate(userId, { subscriptions: true });
                updateData.status = 'success';
            } else if (transactionStatus === 'settlement') {
                // Update subscription status
                await User.findByIdAndUpdate(userId, { subscriptions: true });
                updateData.status = 'success';
            } else if (transactionStatus === 'cancel' || transactionStatus === 'deny' || transactionStatus === 'expire' || transactionStatus === 'failed') {
                // Handle failed transaction
                updateData.status = 'failed';
            } else if (transactionStatus === 'pending') {
                // Handle pending transaction
                updateData.status = 'pending';
            }

            // Update transaction record
            await Transaction.updateOne({ orderId }, updateData, { upsert: true });

            res.status(200).send('OK');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
