import mongooseConnect from '../../../../lib/mongoose';
import { User } from '../../../../models/User';
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
            const transactionStatus = statusResponse.transaction_status;
            const fraudStatus = statusResponse.fraud_status;

            if (transactionStatus == 'capture') {
                if (fraudStatus == 'accept') {
                    // Update subscription status
                    await User.findOneAndUpdate({ email: statusResponse.order_id }, { subscriptions: true });
                }
            } else if (transactionStatus == 'settlement') {
                // Update subscription status
                await User.findOneAndUpdate({ email: statusResponse.order_id }, { subscriptions: true });
            } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
                // Handle failed transaction
            } else if (transactionStatus == 'pending') {
                // Handle pending transaction
            }

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
