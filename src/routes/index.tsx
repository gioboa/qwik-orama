import { $, component$, useSignal } from '@builder.io/qwik';
import { server$ } from '@builder.io/qwik-city';
import { search } from '@orama/orama';
import { type Pokemon, oramaDb } from '~/server';

export default component$(() => {
	const pokedexSig = useSignal<Pokemon[]>([]);
	const termSignal = useSignal('');

	const onSearch = $(async (term: string) => {
		const response = await execSearch(term);
		pokedexSig.value = (response.hits || []).map(
			(hit) => hit.document as unknown as Pokemon
		);
	});

	return (
		<div>
			<div class='m-4'>
				<div class='relative'>
					<input
						class='block w-full p-4 pl-10 text-md placeholder-black text-black border border-gray-300 rounded-lg'
						placeholder='e.g. search for plant, water, hot.'
						bind:value={termSignal}
						onKeyDown$={(e) => {
							if (e.key === 'Enter') {
								onSearch(termSignal.value);
							}
						}}
					/>
					<button
						type='submit'
						class='text-black absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm pr-2 top-1'
						onClick$={() => onSearch(termSignal.value)}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='32'
							height='32'
							viewBox='0 0 24 24'
						>
							<path
								fill='currentColor'
								d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z'
							/>
						</svg>
					</button>
				</div>
			</div>
			<div class='m-4 flex flex-wrap justify-around'>
				{pokedexSig.value.map(({ name, description, image }) => (
					<div
						key={name}
						class='w-[300px] bg-white border border-gray-200 rounded-lg text-black m-2' 
					>
						<div class='p-5'>
							<img
								width={200}
								height={200}
								class='m-auto mb-4'
								src={image}
								alt={name}
							/>
							<h5 class='mb-2 text-2xl font-bold'>{name}</h5>
							<p class='mb-3'>{description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
});

export const execSearch = server$(async (term: string) => {
	const response = await search(oramaDb, {
		term,
		properties: '*',
		boost: { name: 1.5 },
	});
	return response;
});
