import axios from 'axios';

export const ServiceAPI = (q, page) => {
  const options = {
    params: {
      key: '26803682-7d038b411c0c8c8df438e6d20',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q,
      per_page: 12,
      page,
    },
  };

  return axios.get('https://pixabay.com/api/', options);
};


