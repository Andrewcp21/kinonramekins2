import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Kinonramekins",
  description: "How Kinonramekins handles personal data and Google user data.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-gray-700 leading-relaxed">
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
        ← Kinonramekins Online Baking Class
      </Link>
      <h1 className="font-serif text-3xl text-black mt-6 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: 12 October 2026</p>

      <h2 className="font-semibold text-black mt-8 mb-2">Who we are</h2>
      <p>
        Kinonramekins runs online baking classes. This policy explains how we handle data on this
        website and in the internal tools we use to run the business.
      </p>

      <h2 className="font-semibold text-black mt-8 mb-2">Class purchases</h2>
      <p>
        When you buy a class, we use your name, email address and WhatsApp number only to give you
        access to the class materials and to support you. We do not sell your data.
      </p>

      <h2 className="font-semibold text-black mt-8 mb-2">Google user data</h2>
      <p>
        We use a private, internal tool that connects only to our own Google account. It requests
        read-only access to Google Drive and Drive Activity, and reads the activity on our own class
        folders so we can count class sign-ups for our business reporting.
      </p>
      <ul className="list-disc pl-6 mt-3 space-y-1">
        <li>It does not create, modify, delete or share any files.</li>
        <li>It is not offered to the public and does not access anyone else&apos;s Google account.</li>
        <li>
          Data obtained through Google APIs is used only for the reporting described above, is not
          sold, and is not shared with third parties.
        </li>
      </ul>
      <p className="mt-3">
        Our use of information received from Google APIs adheres to the Google API Services User
        Data Policy, including the Limited Use requirements.
      </p>

      <h2 className="font-semibold text-black mt-8 mb-2">Analytics</h2>
      <p>
        This website uses Meta Pixel and Google Analytics to understand visits and measure our ads.
      </p>

      <h2 className="font-semibold text-black mt-8 mb-2">Contact</h2>
      <p>
        Questions or requests to delete your data:{" "}
        <a href="mailto:kinonramekins@gmail.com" className="underline">
          kinonramekins@gmail.com
        </a>
      </p>
    </main>
  );
}
