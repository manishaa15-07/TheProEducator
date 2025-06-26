import PolicyNav from "../components/PolicyNav";

export default function ResponsibleDisclosurePolicy() {
    return (
        <div className="max-w-4xl mx-auto py-6 px-2 sm:py-8 sm:px-4 w-full">
            <PolicyNav />
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Responsible Disclosure Policy</h1>

            <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                At The ProEducator (Prashant Kumar LTD), we care deeply about maintaining the trust and confidence that our customers place in us. We understand that the protection of customer data is a significant responsibility and demands our highest priority. We therefore take the security of our digital platforms extremely seriously, and we genuinely value the assistance of security researchers and others in the security community in helping keep them secure.
            </p>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                If you are a security researcher and have discovered a security vulnerability in one of our digital platforms, we appreciate your cooperation in disclosing it to us in a responsible manner. We will validate and fix confirmed vulnerabilities in accordance with our commitment to security and privacy.
            </p>

            <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4">REPORTING</h2>
                <p className="text-sm sm:text-base">
                    Security researchers should exclusively use the form at the end of this page to share the details of any suspected vulnerability—not any other channel of communication—and must include detailed information with steps for us to reproduce the vulnerability.
                </p>
            </section>

            <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4">COMPLIANCE</h2>
                <p className="mb-2 sm:mb-4 text-sm sm:text-base">
                    To ensure a cooperative and ethical disclosure process, the following activities are strictly prohibited under this policy and will be considered non-compliant:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                    <li>Publicly disclosing the details of any identified or alleged vulnerability without express written consent from The ProEducator (Prashant Kumar LTD)</li>
                    <li>Modifying data residing in an account that does not belong to you</li>
                    <li>Accessing or downloading data beyond the minimum required to demonstrate a vulnerability (no more than 1–2 records, if necessary)</li>
                    <li>Attempting to execute actions that disrupt the availability of our digital assets (e.g. volumetric or denial-of-service attacks)</li>
                    <li>Posting, transmitting, uploading, linking to, sending, or storing any malicious software</li>
                    <li>Testing in a manner that involves unsolicited or unauthorized junk mail, SMS, spam, or similar unsolicited messages</li>
                    <li>Testing in ways that degrade the performance or operation of any The ProEducator (Prashant Kumar LTD) digital assets</li>
                    <li>Testing third-party applications, websites, or services that integrate with or link to The ProEducator (Prashant Kumar LTD) digital assets</li>
                    <li>Making any unauthorized changes to system configurations, files, or data</li>
                    <li>Introducing backdoors in any digital asset</li>
                    <li>Conducting non-technical attacks, such as social engineering or phishing</li>
                </ul>
            </section>
        </div>
    );
} 