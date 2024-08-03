import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { taxIdFormatter } from '../../utils/formatters/tax-id-formatter';

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
      <button
        className="btn btn-primary"
        disabled={!isValid}
        type="submit"
        style={{ height: '38px' }}
      >
        Request Verification
      </button>
    </form>
  );
};
