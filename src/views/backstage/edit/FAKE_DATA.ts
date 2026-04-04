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
    chapter_id: '0a85a3c5-d779-44e3-b2c6-b9cebb49b131',
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
    chapter_id: '9c0ed5f6-efc8-4116-909f-14e3daed9068',
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
    chapter_id: '9a8b9342-f2dc-440f-911e-3a889f0ee7bb',
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
    chapter_id: '656f0822-e60f-4c77-9a44-44ed35630d02',
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
    chapter_id: '715b1aae-a65a-4ad3-99f2-03d5ed4060a7',
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
    chapter_id: '3581986d-b044-441d-9ac5-25812defd19a',
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
    chapter_id: '0c3cd33f-e753-4a92-af10-8bb151f3cd40',
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
    chapter_id: '8b991807-e396-4b91-a37a-0a4a1343442f',
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
    chapter_id: '1a5f79d2-6851-4202-95c8-186be117f497',
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
    chapter_id: '3859a75a-75db-405a-8b2e-6602447119a7',
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
    chapter_id: '8813bf8b-acdb-4755-897c-0b643be6c6cc',
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
    chapter_id: '99805dcf-ec8b-4bd6-9ffa-2feffe4835bf',
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
    chapter_id: 'ac6010b2-8a19-441d-8439-c85fef3e154b',
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
    chapter_id: 'f4ef3cc7-5653-45de-973d-498d52d1a910',
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
    chapter_id: 'b18bf1ea-f142-471a-8637-1e2345f85cbd',
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
    chapter_id: 'fa04b6d8-8790-48bb-9366-b5be4a53806e',
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
    chapter_id: '73db590f-6392-45ed-91eb-72bed241b4a3',
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