import { Errta } from './errata';
import { FaqAndErrataOverview } from './faq-and-errata-overview';
import { FAQs } from './faqs';

export const FaqAndErrata = () => {
	return (
		<div className='tsd-container'>
			<FaqAndErrataOverview />
			<Errta />
			<FAQs />
		</div>
	);
};
