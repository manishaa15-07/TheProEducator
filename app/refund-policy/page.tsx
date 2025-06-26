import Link from "next/link";
import PolicyNav from "../components/PolicyNav";

export default function RefundPolicy() {
    return (
        <div className="max-w-4xl mx-auto py-6 px-2 sm:py-8 sm:px-4 w-full">
            <PolicyNav />
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Refund Policy for All Products Other Than Prashant Kumar Live and Prashant Kumar IELTS</h1>
            <p className="text-sm sm:text-base">We offer a refund if we have missed deadlines or there is any breach of service committed by one of our experts. In such cases, we also take strict action against the expert, along with issuing an immediate refund. However, if the refund request is made on the basis of a ‘change of mind’, we follow a ‘No Refund, Exchange Only’ policy.
                All products are sold "as is". You may contact us within 120 days from the purchase date if you wish to exchange your purchase for a product of equal or lesser value.
                For the Refund Policy for and Prashant Kumar  products.
                <br />
                <Link href="/" className="text-[oklch(84.5%_.18_83.6)] font-bold">Click here</Link>

            </p>
        </div >
    );
} 