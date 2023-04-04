import faker from 'faker';

export const fixedNews = [
  {
    id: '2de0306f-a712-4078-b1f0-b223c2f4246b',
    publicationDate: '2021-08-27T04:38:33.816Z',
    title: 'Reverse-engineered even-keeled standardization',
    text: 'Nemo pariatur dolores ut vero velit non.',
    image: 'https://loremflickr.com/cache/resized/65535_51753983634_8bd14f18b5_b_640_480_nofilter.jpg'
  },
];

const createNews = () => ({
  id: faker.datatype.uuid(),
  publicationDate: faker.date.between('2020-01-01', '2021-12-12'),
  title: faker.company.catchPhrase(),
  text: faker.lorem.paragraphs(3),
  image: faker.image.image()
});

export const generateNews = (count) => {
  return Array.from({ length: count }, createNews);
};
