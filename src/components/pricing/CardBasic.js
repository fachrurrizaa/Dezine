'use client'
import Image from "next/image";
import Check from "/public/assets/check-icon.svg";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function CardBasic() {
    const router = useRouter();
    const { data: session } = useSession();

    async function handleClick() {
        if (!session) {
            router.push('/login');
        } else {
            try {
                const userId = session?.user?._id;
                
                if (!userId) {
                    console.error('User ID not found in session');
                    return;
                }
                
                const response = await axios.post('/api/subscribe', { 
                    name: "Basic Plan",
                    userId: userId,
                    price: 200000
                });

                if (response.data && response.data.token) {
                    window.snap.pay(response.data.token, {
                        onSuccess: async function(result) {
                            try {
                                await axios.post('/api/notification', { ...result, status: 'settlement' });
                            } catch (error) {
                                console.error('Error sending notification', error);
                            }
                        },
                        onPending: function(result) {
                            console.log('Pending:', result);
                            // Handle pending transaction here
                        },
                        onError: async function(result) {
                            console.log('Error:', result);
                            try {
                                await axios.post('/api/notification', { ...result, status: 'failed' });
                            } catch (error) {
                                console.error('Error sending notification', error);
                            }
                        },
                        onClose: async function() {
                            console.log('Customer closed the popup without finishing the payment');
                            try {
                                await axios.post('/api/notification', { order_id: response.data.token, status: 'cancelled' });
                            } catch (error) {
                                console.error('Error sending notification', error);
                            }
                        }
                    });
                }
            } catch (error) {
                console.error('Error creating transaction', error);
            }
        }
    }

    return (
        <div className='w-[397px] h-[502px] rounded-3xl border-solid border-[#E6EAF2] border px-8'>
            <h1 className='text-[45px] font-bold mt-7 mb-7'>IDR 200,000<span className='text-[#6B7193] text-lg font-normal'>/month</span></h1>
            <h5 className="text-lg font-semibold">Basic Plan</h5>
            <p className="text-base font-normal text-[#6B7193] mb-7">Suitable for new team</p>
            <div className="flex gap-3 mb-4">
                <Image src={Check} height={0} width={0} alt="check-icon" className="w-6 h-auto" />
                <p className="text-base font-normal text-[#004f4f]">Customizable layers</p>
            </div>
            <div className="flex gap-3 mb-4">
                <Image src={Check} height={0} width={0} alt="check-icon" className="w-6 h-auto" />
                <p className="text-base font-normal text-[#004f4f]">Official documentation</p>
            </div>
            <div className="flex gap-3 mb-4">
                <Image src={Check} height={0} width={0} alt="check-icon" className="w-6 h-auto" />
                <p className="text-base font-normal text-[#004f4f]">SVG icons</p>
            </div>
            <div className="flex gap-3 mb-4">
                <Image src={Check} height={0} width={0} alt="check-icon" className="w-6 h-auto" />
                <p className="text-base font-normal text-[#004f4f]">SVG illustrations</p>
            </div>
            <div className="flex gap-3 mb-8">
                <Image src={Check} height={0} width={0} alt="check-icon" className="w-6 h-auto" />
                <p className="text-base font-normal text-[#004f4f]">Pre-built design screen</p>
            </div>
            <Button className={"text-[#004f4f] bg-[#EBEDF3] w-full hover:bg-[#02b2bb] hover:text-white"} click={() => handleClick()} content={"Checkout Now"} />
        </div>
    );
}
