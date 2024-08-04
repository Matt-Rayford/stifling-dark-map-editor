import { FullRetailAccountQuery } from '../../graphql/__generated__/graphql';
import { RetailProperty } from './retail-property';

interface Props {
  properties: NonNullable<FullRetailAccountQuery['retailAccount']>['addresses'];
}

export const RetailProperties = ({ properties }: Props) => {
  return (
    <div className="flex-fluid">
      {properties.map((property) => (
        <RetailProperty key={property.id} property={property} />
      ))}
    </div>
  );
};
