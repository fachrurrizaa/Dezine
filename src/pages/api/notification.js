import { User } from '../../../models/User';
import mongooseConnect from '../../../lib/mongoose';
import midtransClient from 'midtrans-client';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    await mongooseConnect();

    const apiClient = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    try {
        const statusResponse = await apiClient.transaction.notification(req.body);

        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;

        if (transactionStatus === 'capture' && fraudStatus === 'accept') {
            const userId = orderId.split('-')[1]; // Extract userId from orderId
            await User.findByIdAndUpdate(userId, { subscriptions: true });
        }

        res.status(200).json({ message: 'Notification received' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default handler;
