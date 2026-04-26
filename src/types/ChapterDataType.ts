export type PageData = {
  page_id: string
  page_number: number
  is_last_of_this_chapter: boolean
  page_img_url: string
}

export type ChapterData = {
  chapter_id: string
  chapter_number: number
  chapter_name: string
  chapter_description: string
  chapter_pages: PageData[]
  last_update: string
  release_date: string
}
