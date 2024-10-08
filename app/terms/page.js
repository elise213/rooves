"use client";
import React, { useContext } from "react";
import { Context } from "../context/appContext";
import Link from "next/link";
import styles from "../page.module.css";

const Terms = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className={styles.termsPage}>
      <Link href="/">
        <button className={styles.backButton}>
          <span className={styles.arrow}>←</span> Back to Shop
        </button>
      </Link>
      <div className="termsHeader">
        <h1>Terms and Conditions for Annual Membership</h1>
        <p>Effective Date: October 1, 2022</p>
        <p>Last Updated: October 7, 2024</p>
      </div>

      <div className="termsContent">
        <div className="termsSection">
          <h2>1. Membership Overview</h2>
          <p>
            By subscribing to an annual group membership, you are granted access
            to a private WhatsApp group where members can offer and exchange
            homes for temporary accommodation in exchange for a fee. By joining,
            you agree to abide by the following terms and conditions.
          </p>
        </div>

        <div className="termsSection">
          <h2>2. Membership</h2>
          <p>
            Membership is valid for one year from the date of subscription. Your
            membership will automatically renew if you do not cancel. Renewal
            notices will be sent prior to the expiration of the membership.
            Failure to make a valid payment will result in removal from the
            group.
          </p>
        </div>

        <div className="termsSection">
          <h2>3. Eligibility</h2>
          <p>
            You must be at least 18 years old to join the group. Members must
            provide accurate personal information during registration. Each
            member is entitled to one account, which is non-transferable.
          </p>
        </div>

        <div className="termsSection">
          <h2>4. Group Conduct</h2>
          <p>
            All posts and exchanges must be related to housing offers or
            requests. Members must treat others respectfully and refrain from
            discriminatory, abusive, or offensive language. Spam, unsolicited
            promotions, and irrelevant content are prohibited. Members must
            comply with all local laws and may not engage in illegal activities,
            including but not limited to fraud, unauthorized transactions, or
            misuse of the group.
          </p>
        </div>

        <div className="termsSection">
          <h2>5. Home Listings</h2>
          <p>
            Members are responsible for providing accurate and complete
            information about their homes, including the rental fee, location,
            duration, and any terms specific to the stay. The platform does not
            verify or endorse any listings. Members must perform due diligence
            before entering into any agreements. All agreements and transactions
            are made directly between members, without involvement or liability
            from the group administrators.
          </p>
        </div>

        <div className="termsSection">
          <h2>6. Payments and Transactions</h2>
          <p>
            All financial transactions are made directly between the member
            offering the property and the member renting it. The group
            administrators are not involved in any payment process and cannot be
            held responsible for disputes. Members must agree on the payment
            method and rental terms independently. It is recommended that
            payments be documented.
          </p>
        </div>

        <div className="termsSection">
          <h2>7. Disputes</h2>
          <p>
            The group administrators are not liable for resolving disputes
            between members. Any issues related to housing conditions, payments,
            or other aspects of the rental agreement must be resolved by the
            parties involved. Members may report inappropriate behavior or
            listings to the administrators, who may take action, including
            removal from the group.
          </p>
        </div>

        <div className="termsSection">
          <h2>8. Termination of Membership</h2>
          <p>
            The administrators reserve the right to terminate the membership of
            any individual who violates these terms and conditions. Membership
            may be terminated without refund for breaching group rules, engaging
            in illegal activities, or any other reasons deemed necessary by the
            administrators.
          </p>
        </div>

        <div className="termsSection">
          <h2>9. Privacy</h2>
          <p>
            By joining the group, you consent to sharing your contact details
            (phone number) with other members.
          </p>
        </div>

        <div className="termsSection">
          <h2>10. Waiver of Liability</h2>
          <p>
            No Responsibility for Transactions or Disputes. By participating in
            this WhatsApp housing group, you acknowledge and agree that the
            group administrators, owners, and any affiliates (collectively
            referred to as “the Administrators”) are not responsible for any
            disputes, issues, or disagreements that may arise between members.
            All transactions, arrangements, and agreements regarding housing are
            strictly between the individual members involved.
          </p>
        </div>

        <div className="termsSection">
          <h2>11. Amendments to Terms</h2>
          <p>
            These terms and conditions are subject to change. Any amendments
            will be found here, and continued participation in the group implies
            acceptance of updated terms.
          </p>
        </div>

        <div className="termsSection">
          <h2>Contact Information</h2>
          <p>
            For questions or concerns regarding these terms, please contact us{" "}
            <Link href="/contact" passHref>
              Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
