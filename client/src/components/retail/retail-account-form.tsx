import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';

import { taxIdFormatter } from '../../utils/formatters/tax-id-formatter';
import { USStates } from '../../utils/states/us-states';
import { zipCodeFormatter } from '../../utils/formatters/zip-code-formatter';
import { phoneNumberFormatter } from '../../utils/formatters/phone-number-formatter';
import {
  RequestRetailAccountDocument,
  RetailAccountQuery,
} from '../../graphql/__generated__/graphql';

const retailFormSchema = z.object({
  companyName: z.string().min(1),
  taxId: z.string().regex(/^[0-9]{2}-[0-9]{7}$/g),
  storeAddress: z.string().min(1),
  storeCity: z.string().min(1),
  storeState: z.string().min(1),
  storePostalCode: z.string().regex(/^[0-9]{5}(-\d{4})?$/g),
  contactName: z.string().min(1),
  contactPhoneNumber: z.string().regex(/^\d{3}-\d{3}-\d{4}$/g),
  contactEmail: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
});
type RetailForm = z.infer<typeof retailFormSchema>;

interface Props {
  onRequest: (retailAccount: RetailAccountQuery['retailAccount']) => void;
}

export const RetailAccountForm = ({ onRequest }: Props) => {
  const [requestRetailAccount, { loading: savingRequest }] = useMutation(
    RequestRetailAccountDocument
  );

  const {
    handleSubmit,
    setValue,
    register,
    formState: { isValid },
  } = useForm<RetailForm>({
    resolver: zodResolver(retailFormSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<RetailForm> = (values) => {
    requestRetailAccount({
      variables: {
        addressInfo: {
          city: values.storeCity,
          contact: {
            email: values.contactEmail,
            name: values.contactName,
            phoneNumber: values.contactPhoneNumber,
          },
          postalCode: values.storePostalCode,
          state: values.storeState,
          streetAddress: values.storeAddress,
        },
        retailAccountInfo: {
          name: values.companyName,
          taxId: values.taxId,
        },
      },
    }).then((r) => {
      if (r.data?.retailAccount) {
        onRequest(r.data.retailAccount);
      }
    });
  };

  return (
    <form
      className="bg-dark text-light"
      data-bs-theme="dark"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Register Your Company</h1>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Company Name</span>
        </div>
        <input
          className="form-control"
          placeholder="My Store..."
          {...register('companyName')}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Tax ID</span>
        </div>
        <input
          className="form-control"
          placeholder="XX-XXXXXXX"
          {...register('taxId', {
            onChange: (e) => {
              const value = e.target.value;
              setValue('taxId', taxIdFormatter(value));
            },
          })}
        />
      </div>

      <hr />

      <h2>Store Info</h2>
      <p>(You can add more addresses after registering!)</p>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Address</span>
        </div>
        <input
          className="form-control"
          placeholder="1111 Store St..."
          {...register('storeAddress')}
        />
      </div>

      <div className="flex-fluid gap-1">
        <div className="input-group mb-3 flex-1">
          <div className="input-group-prepend">
            <span className="input-group-text">City</span>
          </div>
          <input
            className="form-control"
            placeholder="Minneapolis..."
            {...register('storeCity')}
          />
        </div>

        <div className="input-group mb-3 flex-1">
          <div className="input-group-prepend">
            <span className="input-group-text">State</span>
          </div>
          <select
            className="form-select form-select-md"
            aria-label=".form-select-lg example"
            {...register('storeState')}
          >
            {USStates.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group mb-3 flex-1">
          <div className="input-group-prepend">
            <span className="input-group-text">ZIP Code</span>
          </div>
          <input
            className="form-control"
            placeholder="55111..."
            {...register('storePostalCode', {
              onChange: (e) => {
                const value = e.target.value;
                setValue('storePostalCode', zipCodeFormatter(value));
              },
            })}
          />
        </div>
      </div>

      <div className="flex-fluid gap-1">
        <div className="input-group mb-3 flex-1">
          <div className="input-group-prepend">
            <span className="input-group-text">Contact Name</span>
          </div>
          <input
            className="form-control "
            placeholder="John Deer..."
            {...register('contactName')}
          />
        </div>
        <div className="input-group mb-3 flex-1">
          <div className="input-group-prepend">
            <span className="input-group-text">Contact Phone #</span>
          </div>
          <input
            className="form-control "
            placeholder="867-534-9823"
            {...register('contactPhoneNumber', {
              onChange: (e) => {
                const value = e.target.value;
                setValue('contactPhoneNumber', phoneNumberFormatter(value));
              },
            })}
          />
        </div>
      </div>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Contact Email</span>
        </div>
        <input
          className="form-control "
          placeholder="matt@sophisticated..."
          {...register('contactEmail')}
        />
      </div>

      <hr />

      <button
        className="btn btn-primary"
        disabled={!isValid && !savingRequest}
        type="submit"
        style={{ height: '38px' }}
      >
        Request Retail Account
      </button>
    </form>
  );
};
