import { $, component$, useSignal } from '@builder.io/qwik';
import { DocumentHead, server$ } from '@builder.io/qwik-city';
import { Document, search } from '@orama/orama';
import List from '~/components/list/List';
import Search from '~/components/search/Search';
import { db } from '~/server';

export default component$(() => {
	const videosSignals = useSignal<Document[]>([]);

	const onSearch = $(async (term: string) => {
		const response = await execSearch(term);
		videosSignals.value = response.hits.map((hit) => hit.document);
	});

	return (
		<div>
			<Search onSearch={onSearch} />
			<List videos={videosSignals.value} />
		</div>
	);
});

export const head: DocumentHead = {
	title: 'Qwik + Orama',
	meta: [
		{
			name: 'description',
			content: "Let's use Orama with Qwik",
		},
	],
};

export const execSearch = server$(async (term: string) => {
	const response = await search(db, {
		term,
		properties: '*',
		boost: { title: 1.5 },
	});
	return response;
});
