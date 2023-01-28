export const mock = { meals: [
  {
    idMeal: '52977',
    strMeal: 'Corba',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    idMeal: '53060',
    strMeal: 'Burek',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  },
  {
    idMeal: '53065',
    strMeal: 'Sushi',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
  },
  {
    idMeal: '52978',
    strMeal: 'Kumpir',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
  },
  {
    idMeal: '53026',
    strMeal: 'Tamiya',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
  },
  {
    idMeal: '52785',
    strMeal: 'Dal fry',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
  },
  {
    idMeal: '52804',
    strMeal: 'Poutine',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
  },
  {
    idMeal: '52844',
    strMeal: 'Lasagne',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
  },
  {
    idMeal: '52929',
    strMeal: 'Timbits',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
  },

] };

export const mockIngredients = { meals: [
  {
    strMeal: 'Burek',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    idMeal: '53060',
  },
  {
    strMeal: 'Tuna and Egg Briks',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/2dsltq1560461468.jpg',
    idMeal: '52975',
  },
],
};

export const mockFirstLetter = { meals: [
  {
    strMeal: 'Dal fry',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
    idMeal: '52785',
  },
  {
    strMeal: 'Dundee cake',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wxyvqq1511723401.jpg',
    idMeal: '52899',
  },
  {
    strMeal: 'Duck Confit',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpvsu1511786158.jpg',
    idMeal: '52907',
  },
] };

export const storageMock = (() => {
  let store = {
    user: {
      email: 'test@test.com',
    },
  };

  return {
    getItem(key) {
      return JSON.stringify(store[key]);
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();
