type pageData = {
  page_id: string
  page_number: number
  page_updated_at: string
  page_isLast: boolean
}
export type ChapterData = {
  chapter_id: string
  chapter_number: number
  chapter_name: string
  chapter_description: string
  chapter_updated_at: string
  chapter_pages: pageData[]
}

const FAKE_CHAPTER_DATA_ARRAY: ChapterData[] = [
  {
    chapter_id: '1',
    chapter_number: 1,
    chapter_name: 'Chapter 1',
    chapter_description: 'Chapter 1 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '1',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '2',
    chapter_number: 2,
    chapter_name: 'Chapter 2',
    chapter_description: 'Chapter 2 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '2',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: false,
      },
      {
        page_id: '3',
        page_number: 2,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '3',
    chapter_number: 3,
    chapter_name: 'Chapter 3',
    chapter_description: 'Chapter 3 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '4',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },

  {
    chapter_id: '4',
    chapter_number: 4,
    chapter_name: 'Chapter 4',
    chapter_description: 'Chapter 4 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '5',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: false,
      },
      {
        page_id: '6',
        page_number: 2,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },

  {
    chapter_id: '5',
    chapter_number: 5,
    chapter_name: 'Chapter 5',
    chapter_description: 'Chapter 5 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '7',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '6',
    chapter_number: 6,
    chapter_name: 'Chapter 6',
    chapter_description: 'Chapter 6 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '8',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: false,
      },
      {
        page_id: '9',
        page_number: 2,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '7',
    chapter_number: 7,
    chapter_name: 'Chapter 7',
    chapter_description: 'Chapter 7 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '10',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '8',
    chapter_number: 8,
    chapter_name: 'Chapter 8',
    chapter_description: 'Chapter 8 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '11',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: false,
      },
      {
        page_id: '12',
        page_number: 2,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '9',
    chapter_number: 9,
    chapter_name: 'Chapter 9',
    chapter_description: 'Chapter 9 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '13',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '10',
    chapter_number: 10,
    chapter_name: 'Chapter 10',
    chapter_description: 'Chapter 10 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '14',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: false,
      },
      {
        page_id: '15',
        page_number: 2,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '11',
    chapter_number: 11,
    chapter_name: 'Chapter 11',
    chapter_description: 'Chapter 11 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '16',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '12',
    chapter_number: 12,
    chapter_name: 'Chapter 12',
    chapter_description: 'Chapter 12 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '17',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: false,
      },
      {
        page_id: '18',
        page_number: 2,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '13',
    chapter_number: 13,
    chapter_name: 'Chapter 13',
    chapter_description: 'Chapter 13 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '19',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '14',
    chapter_number: 14,
    chapter_name: 'Chapter 14',
    chapter_description: 'Chapter 14 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '20',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: false,
      },
      {
        page_id: '21',
        page_number: 2,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '15',
    chapter_number: 15,
    chapter_name: 'Chapter 15',
    chapter_description: 'Chapter 15 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '22',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '16',
    chapter_number: 16,
    chapter_name: 'Chapter 16',
    chapter_description: 'Chapter 16 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '23',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: false,
      },
      {
        page_id: '24',
        page_number: 2,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
  {
    chapter_id: '17',
    chapter_number: 17,
    chapter_name: 'Chapter 17',
    chapter_description: 'Chapter 17 description',
    chapter_updated_at: '2026-04-04',
    chapter_pages: [
      {
        page_id: '25',
        page_number: 1,
        page_updated_at: '2026-04-04',
        page_isLast: true,
      },
    ],
  },
]

export { FAKE_CHAPTER_DATA_ARRAY }