import Head from './Head';

const PrivacyPolicy = () => {
  return (
      <div className=" bg-bg_white h-full">
        <Head title="PRIVACY POLICY" />
        <div className="flex w-full justify-center h-auto">
          <div className="flex flex-col w-4/5 outline outline-0 z-10 -mt-28  rounded-2xl bg-bg_white shadow-2xl">
            <div className="p-10">
              <span className="font-semibold">Last Updated: </span>
              <p className="text-sm mb-4">
                Welcome to Samaritan, a social networking app connecting volunteers worldwide. This Privacy Policy outlines how Samaritan collects, uses, shares, and protects your personal information. By using the Samaritan app, you agree to the terms of this Privacy Policy.
              </p>
              <ol className="list-decimal pl-4 font-semibold">
                <li>Information We Collect</li>
                <ul className="list-disc text-sm font-normal mb-4">
                  <li>Account Information: To use Samaritan, you may need to create an account, providing your name, email address, and other relevant information.</li>
                  <li>User-Generated Content: We collect information you generate, including posts, comments, and other content you share on Samaritan.</li>
                  <li>Volunteer Preferences: Information about your volunteer interests and preferences may be collected to provide personalized volunteer opportunities.</li>
                  <li>Device Information: We may collect information about the device you use to access Samaritan, such as device type, operating system, and browser.</li>
                </ul>

                <li>How We Use Your Information</li>
                <ul className="list-disc text-sm font-normal mb-4">
                  <li>Service Provision: We use your information to provide and improve Samaritan's services, including connecting you with relevant volunteer opportunities.</li>
                  <li>Communication: We may use your email address to send important notifications and updates related to Samaritan.</li>
                  <li>Analytics: We collect and analyze data to improve the functionality and user experience of Samaritan.</li>
                </ul>

                <li>Sharing of Information</li>
                <ul className="list-disc text-sm font-normal mb-4">
                  <li>Third-Party Organizations: Samaritan may share your information with third-party organizations offering volunteer opportunities. However, your personal information will not be shared without your consent.</li>
                  <li>Legal Requirements: We may disclose your information if required by law, or if we believe such action is necessary to comply with legal processes, protect our rights, or ensure the safety of our users.</li>
                </ul>

                <li>Your Choices</li>
                <ul className="list-disc text-sm font-normal mb-4">
                  <li>Account Settings: You can manage your account settings to control the information you share and the notifications you receive.</li>
                  <li>Opt-Out: You can opt-out of receiving non-essential communications from Samaritan.</li>
                </ul>

                <li>Security</li>
                <p className="text-sm font-normal mb-4">We take reasonable measures to protect your personal information from unauthorized access or disclosure.</p>

                <li>Third-Party Links</li>
                <ul className="list-disc text-sm font-normal mb-4">
                  <li>Samaritan may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties.</li>
                </ul>

                <li>Children's Privacy</li>
                <ul className="list-disc text-sm font-normal mb-4">
                  <li>Samaritan is not intended for users under the age of 18. We do not knowingly collect or solicit personal information from children.</li>
                </ul>

                <li>Changes to Privacy Policy</li>
                <p className="text-sm font-normal mb-4">Samaritan reserves the right to modify or update this Privacy Policy. Users will be notified of significant changes, and continued use of the app after such changes constitutes acceptance of the updated policy.</p>

                <li>Contact Us</li>
                <p className="text-sm font-normal mb-4">If you have any questions or concerns about this Privacy Policy, please contact us at @samaritan.com</p>
              </ol>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PrivacyPolicy;
