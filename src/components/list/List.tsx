import { component$ } from '@builder.io/qwik';
import { Document } from '@orama/orama';
import { server$ } from '@builder.io/qwik-city';
import PlusIcon from '../plus-icon/PlusIcon';

type Video = { title: string; abstract: string; video: string };

export type IProps = {
	videos: Document[];
};

export default component$<IProps>(({ videos }) => {
	return (
		<div class='m-4'>
			{(videos as Video[]).map(({ title, abstract, video }) => (
				<dl class='text-black divide-y'>
					<div class='flex flex-col pb-3'>
						<dt class='mb-1 md:text-lg font-semibold'>{title}</dt>
						<dd class='text-lg my-2'>{abstract}</dd>
						<a class='text mb-4' href={video}>
							{video}
						</a>
					</div>
				</dl>
			))}
		</div>
	);
});
