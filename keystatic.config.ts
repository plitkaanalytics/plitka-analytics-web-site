import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  collections: {
    articles: collection({
      label: 'Статті',
      slugField: 'title',
      path: 'content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Заголовок' },
          slug: { label: 'Slug (URL)', description: 'Латиницею через дефіс, напр. kalibre-v-ukryttakh' },
        }),
        date: fields.date({
          label: 'Дата публікації',
          validation: { isRequired: true },
        }),
        dek: fields.text({
          label: 'Підзаголовок (dek)',
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
          components: {},
        }),
      },
    }),
  },
});
