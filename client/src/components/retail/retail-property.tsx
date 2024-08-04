import { FullRetailAccountQuery } from '../../graphql/__generated__/graphql';

interface Props {
  property: NonNullable<
    FullRetailAccountQuery['retailAccount']
  >['addresses'][0];
}

export const RetailProperty = ({ property }: Props) => {
  return (
    <div className="retail-property-card">
      <h3 className="underline">{property.name ?? property.streetAddress}</h3>
      <p>More content coming soon...</p>
    </div>
  );
};
