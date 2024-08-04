import { RetailAccountQuery } from '../../graphql/__generated__/graphql';

interface Props {
  retailAccount: NonNullable<RetailAccountQuery['retailAccount']>;
}

export const RetailAccountStatus = ({ retailAccount }: Props) => {
  if (retailAccount.rejected) {
    return (
      <>
        <h1>Account Rejected</h1>
        <p>
          Your account has been rejected. This is likely because something you
          enetered about your business makes it seem like a false address. If
          you believe this was a mistake, please email{' '}
          <a className="link" href="mailto:support@sophisticatedcerberus.com">
            support@sophisticatedcerberus.com
          </a>
        </p>
      </>
    );
  }

  if (!retailAccount.verified) {
    return (
      <>
        <h1>Your Account is Pending</h1>
        <p>
          Our team is reviewing your information, and your account will be
          approved within 48 hours!
        </p>
      </>
    );
  }

  return null;
};
