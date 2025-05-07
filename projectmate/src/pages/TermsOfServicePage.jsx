import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";

const TermsOfServicePage = () => {
  // Utility function to get the date 2 months from today
  const getDayTime = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 5);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={16} className="mr-1 font-poppins" />
          Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 font-geologica">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-8 font-poppins">Last Updated: {getDayTime()}</p>

          <div className="prose max-w-none">
            <h2 className="font-poppins">1. Introduction</h2>
            <p className="font-calibri">
              Welcome to Project Mate ("we," "our," or "us"). These Terms of
              Service ("Terms") govern your access to and use of the Project
              Mate website, services, and applications (collectively, the
              "Service"). By accessing or using the Service, you agree to be
              bound by these Terms. If you do not agree to these Terms, you may
              not access or use the Service.
            </p>

            <h2 className="font-poppins">2. Acceptance of Terms</h2>
            <p className="font-calibri">
              By creating an account, accessing, or using our Service, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms. If you are using the Service on behalf of an
              organization, you represent and warrant that you have the
              authority to bind that organization to these Terms.
            </p>

            <h2 className="font-poppins">3. Changes to Terms</h2>
            <p className="font-calibri">
              We reserve the right to modify these Terms at any time. We will
              provide notice of any material changes by posting the updated
              Terms on our website or through other communications. Your
              continued use of the Service after such notice constitutes your
              acceptance of the modified Terms.
            </p>

            <h2 className="font-poppins">4. Account Registration and Security</h2>
            <p className="font-calibri">
              To use certain features of the Service, you may need to create an
              account. You are responsible for:
            </p>
            <ul className="font-calibri">
              <li>
                Providing accurate and complete information during registration
              </li>
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>
                Notifying us immediately of any unauthorized use of your account
              </li>
            </ul>
            <p className="font-calibri">
              We reserve the right to suspend or terminate accounts that violate
              these Terms or for any other reason at our sole discretion.
            </p>

            <h2 className="font-poppins">5. User Conduct</h2>
            <p className="font-calibri">You agree not to use the Service to:</p>
            <ul className="font-calibri">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>
                Post or transmit content that is unlawful, harmful, threatening,
                abusive, harassing, defamatory, vulgar, obscene, or otherwise
                objectionable
              </li>
              <li>Impersonate any person or entity</li>
              <li>
                Interfere with or disrupt the Service or servers or networks
                connected to the Service
              </li>
              <li>
                Collect or store personal data about other users without their
                consent
              </li>
              <li>
                Engage in any activity that could harm or damage our reputation
                or Service
              </li>
            </ul>

            <h2 className="font-poppins">6. User Content</h2>
            <p className="font-calibri">
              You retain ownership of any content you submit, post, or display
              on or through the Service ("User Content"). By submitting User
              Content, you grant us a worldwide, non-exclusive, royalty-free
              license to use, reproduce, modify, adapt, publish, translate, and
              distribute such content in connection with providing and promoting
              the Service.
            </p>
            <p>You represent and warrant that:</p>
            <ul className="font-calibri">
              <li>You own or have the necessary rights to the User Content</li>
              <li>
                The User Content does not infringe upon the intellectual
                property rights or other rights of any third party
              </li>
              <li>
                The User Content complies with these Terms and all applicable
                laws
              </li>
            </ul>

            <h2 className="font-poppins">7. Intellectual Property Rights</h2>
            <p className="font-calibri">
              The Service and its original content, features, and functionality
              are owned by Project Mate and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property or proprietary rights laws.
            </p>
            <p className="font-calibri">
              You may not copy, modify, create derivative works, publicly
              display, publicly perform, republish, download, store, or transmit
              any of the material on our Service, except as follows:
            </p>
            <ul className="font-calibri">
              <li>
                Your computer may temporarily store copies of such materials
                incidental to your accessing and viewing those materials
              </li>
              <li>
                You may store files that are automatically cached by your web
                browser for display enhancement purposes
              </li>
              <li>
                If we provide social media features with certain content, you
                may take such actions as are enabled by such features
              </li>
            </ul>

            <h2 className="font-poppins">8. Projects and Collaborations</h2>
            <p className="font-calibri">
              Project Mate facilitates connections between project creators and
              contributors. We are not a party to any agreements between users.
              Users are solely responsible for:
            </p>
            <ul className="font-calibri">
              <li>The terms of their collaborations</li>
              <li>The accuracy of project descriptions</li>
              <li>Fulfilling commitments made to other users</li>
              <li>Resolving any disputes that may arise</li>
            </ul>
            <p className="font-calibri">
              We do not guarantee the quality, safety, or legality of projects,
              nor the qualifications, expertise, or abilities of users.
            </p>

            <h2 className="font-poppins">9. Payments and Fees</h2>
            <p className="font-calibri">
              Some features of the Service may require payment of fees. You
              agree to pay all fees in accordance with the fees, charges, and
              billing terms in effect at the time a fee is due and payable. You
              are responsible for paying all applicable taxes associated with
              your use of the Service.
            </p>
            <p className="font-calibri">
              All payments are non-refundable except as expressly set forth in
              these Terms or as required by applicable law.
            </p>

            <h2 className="font-poppins">10. Limitation of Liability</h2>
            <p className="font-calibri">
              To the maximum extent permitted by law, in no event shall Project
              Mate, its directors, employees, partners, agents, suppliers, or
              affiliates be liable for any indirect, incidental, special,
              consequential, or punitive damages, including without limitation,
              loss of profits, data, use, goodwill, or other intangible losses,
              resulting from:
            </p>
            <ul className="font-calibri">
              <li>
                Your access to or use of or inability to access or use the
                Service
              </li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>
                Unauthorized access, use, or alteration of your transmissions or
                content
              </li>
            </ul>

            <h2 className="font-poppins">11. Disclaimer of Warranties</h2>
            <p className="font-calibri">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
              Project Mate expressly disclaims all warranties of any kind,
              whether express or implied, including but not limited to the
              implied warranties of merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>
            <p className="font-calibri">We make no warranty that:</p>
            <ul className="font-calibri">
              <li>The Service will meet your requirements</li>
              <li>
                The Service will be uninterrupted, timely, secure, or error-free
              </li>
              <li>
                The results that may be obtained from the use of the Service
                will be accurate or reliable
              </li>
              <li>
                The quality of any products, services, information, or other
                material purchased or obtained by you through the Service will
                meet your expectations
              </li>
            </ul>

            <h2 className="font-poppins">12. Indemnification</h2>
            <p className="font-calibri">
              You agree to defend, indemnify, and hold harmless Project Mate,
              its directors, employees, partners, agents, suppliers, and
              affiliates from and against any claims, liabilities, damages,
              judgments, awards, losses, costs, expenses, or fees (including
              reasonable attorneys' fees) arising out of or relating to your
              violation of these Terms or your use of the Service.
            </p>

            <h2 className="font-poppins">13. Termination</h2>
            <p className="font-calibri">
              We may terminate or suspend your account and access to the Service
              immediately, without prior notice or liability, for any reason,
              including without limitation if you breach these Terms. Upon
              termination, your right to use the Service will immediately cease.
            </p>

            <h2 className="font-poppins">14. Governing Law</h2>
            <p className="font-calibri">
              These Terms shall be governed by and construed in accordance with
              the laws of the United States, without regard to its conflict of
              law provisions. You agree to submit to the personal and exclusive
              jurisdiction of the courts located within the United States for
              the resolution of any disputes.
            </p>

            <h2 className="font-poppins">15. Severability</h2>
            <p className="font-calibri">
              If any provision of these Terms is held to be invalid or
              unenforceable, such provision shall be struck and the remaining
              provisions shall be enforced to the fullest extent under law.
            </p>

            <p>
              If you have any questions about these Terms, Please contact us at:
            </p>
            <p>
              Email: support@projectmate.com
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            If you have any questions about our Terms of Service, please{" "}
            <Link to="/contact" className="text-orange-400 hover:text-orange-700">
              Contact us
            </Link>
            .
          </p>
          <Button as="link" to="/" variant="primary">
            Return to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfServicePage;
