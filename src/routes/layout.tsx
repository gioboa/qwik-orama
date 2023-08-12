import { component$, Slot } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';

import Header from '~/components/starter/header/header';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <div class="page">
      <main>
        <Header />
        <Slot />
      </main>
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