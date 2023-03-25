import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (<div>Orama https://oramasearch.com/</div>
    
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
