import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { taxIdFormatter } from '../../utils/formatters/tax-id-formatter';
import { USStates } from '../../utils/states/us-states';
import { zipCodeFormatter } from '../../utils/formatters/zip-code-formatter';
import { phoneNumberFormatter } from '../../utils/formatters/phone-number-formatter';
import { useUser } from '@clerk/clerk-react';

const retailFormSchema = z.object({
  companyName: z.string(),
  taxId: z.string().regex(/^[0-9]{2}-[0-9]{7}$/g),
  storeAddress: z.string(),
  storeCity: z.string(),
  storeState: z.string(),
  storePostalCode: z.string().regex(/^[0-9]{5}(-\d{4})?$/g),
  contactName: z.string(),
  contactPhoneNumber: z.string().regex(/^\d{3}-\d{3}-\d{4}$/g),
  contactEmail: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
});
type RetailForm = z.infer<typeof retailFormSchema>;

export const RetailerForm = () => {
  const { user } = useUser();
  const {
    handleSubmit,
    setValue,
    register,
    formState: { isValid },
  } = useForm<RetailForm>({
    resolver: zodResolver(retailFormSchema),
  });

  const onSubmit = () => {
    console.log('Submit');
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
          placeholder="My Store..."
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
            placeholder="Matt..."
            {...register('contactName')}
          />
        </div>
        <div className="input-group mb-3 flex-1">
          <div className="input-group-prepend">
            <span className="input-group-text">Contact Name</span>
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
        disabled={!isValid}
        type="submit"
        style={{ height: '38px' }}
      >
        Request Retail Account
      </button>
    </form>
  );
};
