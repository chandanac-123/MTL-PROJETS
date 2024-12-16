import Head from './Head';

const TermsAndConditions = () => {
  return (
      <div className=" bg-bg_white h-full ">
        <Head title="TERMS AND CONDITIONS" />
        <div className="flex w-full justify-center h-auto">
          <div className="flex flex-col w-4/5 outline outline-0 z-10 -mt-28  rounded-2xl bg-bg_white shadow-2xl">
            <div className="p-10">
              <span className="font-semibold">Last Updated: </span>
              <p className="text-sm mb-4">
                Welcome to Samaritan, a social networking app connecting volunteers around the world. Before you start using Samaritan, please carefully read and understand the following terms and conditions. By accessing or using the Samaritan app, you agree to comply with and be bound by these
                terms.
              </p>
              <ol className="list-decimal pl-4 font-semibold">
                <li>Acceptance of Terms</li>
                <p className="text-sm font-normal mb-4">By using Samaritan, you acknowledge that you have read, understood, and agree to be bound by these terms and any future modifications. If you do not agree with any part of these terms, please do not use the app.</p>
                <li>Eligibility</li>
                <p className="text-sm font-normal mb-4">You must be at least 13 years old or the age of majority in your jurisdiction to use Samaritan. By using the app, you represent and warrant that you meet the eligibility requirements.</p>

                <li>User Accounts</li>
                <ul className="list-disc text-sm font-normal mb-4">
                  <li>Registration: To access certain features of Samaritan, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process.</li>
                  <li>Security: You are responsible for maintaining the confidentiality of your account information and password. Notify Samaritan immediately of any unauthorized use of your account.</li>
                </ul>

                <li>Code of Conduct</li>
                <ul className="list-disc text-sm font-normal mb-4">
                  <li>Respect: Users must treat each other with respect and courtesy. Any form of harassment, hate speech, or inappropriate behavior will not be tolerated.</li>
                  <li>Compliance: Users must comply with all applicable laws and regulations while using Samaritan. This includes but is not limited to local, national, and international laws.</li>
                </ul>
                <li>Privacy Policy</li>
                <p className="text-sm font-normal mb-4">Samaritan's Privacy Policy, available on the app, outlines how we collect, use, and protect your personal information. By using the app, you consent to the practices described in the Privacy Policy.</p>

                <li>Volunteer Opportunities</li>
                <ul className="list-disc text-sm font-normal mb-4">
                  <li>Third-party organizations: Samaritan may connect users with volunteer opportunities provided by third-party organizations. Samaritan does not endorse or guarantee the accuracy of information provided by these organizations.</li>
                  <li>User Responsibility: Users are responsible for verifying the legitimacy and suitability of volunteer opportunities before engaging in any activities.</li>
                </ul>

                <li>Content Ownership and Usage</li>
                <ul className="list-disc text-sm font-normal mb-4">
                  <li>User-generated content: Users retain ownership of the content they create and share on Samaritan. However, by using the app, you grant Samaritan a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content.</li>
                  <li>Intellectual Property: Samaritan and its logo are trademarks owned by Samaritan. All other trademarks, names, and logos used within the app are the property of their respective owners.</li>
                </ul>

                <li>Termination</li>
                <p className="text-sm font-normal mb-4">Samaritan reserves the right to suspend or terminate your account, without notice, for any violation of these terms or any other conduct that we deem harmful to the community.</p>

                <li>Governing Law</li>
                <p className="text-sm font-normal mb-4">These terms are governed by and construed in accordance with the laws. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts</p>

                <li>Changes to Terms</li>
                <ul className="list-disc text-sm font-normal mb-4">
                  <li>User-generated content: Users retain ownership of the content they create and share on Samaritan. However, by using the app, you grant Samaritan a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content.</li>
                  <li>Intellectual Property: Samaritan and its logo are trademarks owned by Samaritan. All other trademarks, names, and logos used within the app are the property of their respective owners.</li>
                </ul>
              </ol>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TermsAndConditions;
