import { User } from '../../../models/User';
import mongooseConnect from '../../../lib/mongoose';
import midtransClient from 'midtrans-client';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    await mongooseConnect();

    const { userId, price } = req.body;

    try {
        // Fetch the user from the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new Midtrans Snap transaction
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
            clientKey: process.env.MIDTRANS_CLIENT_KEY,
        });

        const transactionParams = {
            transaction_details: {
                order_id: `order-${new Date().getTime()}`,
                gross_amount: price,
            },
            customer_details: {
                email: user.email,
                first_name: user.name,
            },
        };

        const transaction = await snap.createTransaction(transactionParams);

        res.status(200).json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default handler;
