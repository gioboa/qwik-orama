import { server$ } from '@builder.io/qwik-city';
import { create, insert, remove, search } from '@orama/orama'
import { videos } from '~/data'

export const db = await create({
  schema: {
    title: 'string',
    abstract: 'string',
    video: 'string',
  },
})

videos.map(async(video) => await insert(db, video));