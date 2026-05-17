import { config, collection, fields } from '@keystatic/core';
import { wrapper, block } from '@keystatic/core/content-components';

const Methodology = wrapper({
  label: 'Методологія',
  schema: {},
});

const Pullquote = wrapper({
  label: 'Виноска-цитата',
  schema: {
    cite: fields.text({ label: 'Джерело (підпис під цитатою)' }),
  },
});

const StatGrid = block({
  label: 'Блок статистики (4 показники)',
  schema: {
    v1: fields.text({ label: 'Значення 1' }),
    l1: fields.text({ label: 'Підпис 1' }),
    d1: fields.text({ label: 'Опис 1' }),
    v2: fields.text({ label: 'Значення 2' }),
    l2: fields.text({ label: 'Підпис 2' }),
    d2: fields.text({ label: 'Опис 2' }),
    v3: fields.text({ label: 'Значення 3' }),
    l3: fields.text({ label: 'Підпис 3' }),
    d3: fields.text({ label: 'Опис 3' }),
    v4: fields.text({ label: 'Значення 4' }),
    l4: fields.text({ label: 'Підпис 4' }),
    d4: fields.text({ label: 'Опис 4' }),
  },
});

const Figure = block({
  label: 'Зображення / Карта',
  schema: {
    url: fields.url({
      label: 'URL зображення',
      description: 'Пряме посилання на фото (https://...) або локальний шлях (/images/foto.jpg)',
    }),
    label: fields.text({ label: 'Мітка (верхній текст)' }),
    cap: fields.text({ label: 'Підпис (рисунок)' }),
    src: fields.text({ label: 'Джерело' }),
    dark: fields.checkbox({ label: 'Темний фон', defaultValue: false }),
  },
});

const Callout = wrapper({
  label: 'Врізка / Ключові факти',
  schema: {
    title: fields.text({ label: 'Заголовок врізки' }),
  },
});

const Barchart = block({
  label: 'Гістограма',
  schema: {
    title: fields.text({ label: 'Заголовок' }),
    sub: fields.text({ label: 'Підзаголовок' }),
    data: fields.text({
      label: "Дані (кожен запис через кому: мітка|відсоток|колір)",
      description: "Приклад: СЕР'25|18|steel,ВЕР'25|22|steel,ЖОВ'25|61|rust",
      multiline: true,
    }),
  },
});

export default config({
  storage: { kind: 'local' },
  collections: {
    articles: collection({
      label: 'Статті',
      slugField: 'title',
      path: 'content/articles/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Заголовок' },
          slug: { label: 'Slug (URL)', description: 'Генерується автоматично' },
        }),
        date: fields.date({
          label: 'Дата публікації',
          validation: { isRequired: true },
        }),
        dek: fields.text({
          label: 'Підзаголовок',
          multiline: true,
          validation: { isRequired: true },
        }),
        authors: fields.array(
          fields.text({ label: 'Автор' }),
          { label: 'Автори', itemLabel: (props) => props.value }
        ),
        project: fields.text({ label: 'Назва проєкту', description: 'напр. Ракетна загроза ЧФ' }),
        projectCode: fields.text({ label: 'Код проєкту', description: 'напр. P-01 · РАКЕТИ' }),
        tags: fields.array(
          fields.text({ label: 'Тег' }),
          { label: 'Теги', itemLabel: (props) => props.value }
        ),
        readingTime: fields.number({ label: 'Час читання (хвилини)', validation: { isRequired: true } }),
        sources: fields.number({ label: 'Кількість джерел', validation: { isRequired: true } }),
        category: fields.select({
          label: 'Категорія',
          options: [
            { label: 'Розслідування', value: 'РОЗСЛІДУВАННЯ' },
            { label: 'Брифінг', value: 'БРИФІНГ' },
            { label: 'Аналіз', value: 'АНАЛІЗ' },
            { label: 'Звіт', value: 'ЗВІТ' },
          ],
          defaultValue: 'РОЗСЛІДУВАННЯ',
        }),
        content: fields.mdx({
          label: 'Зміст статті',
          options: {
            heading: [2, 3, 4],
            bold: true,
            italic: true,
            orderedList: true,
            unorderedList: true,
            table: true,
          },
          components: { Methodology, StatGrid, Pullquote, Figure, Barchart, Callout },
        }),
      },
    }),
  },
});
