import AsyncStorage from '@react-native-async-storage/async-storage';

const FAV_STORAGE_KEY = "@FAV_KEY2.ss";

export default FavoritesService = {
  async saveFavorites(fav) {
    let favorites = await this.getFavorites();
    favorites.push(fav);
    await AsyncStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
  },

  async removeFavorite(fav) {
    const favorites = await this.getFavorites();
    var filtered = favorites.filter(favorite => {
      return favorite.id != fav.id;
    });

    await AsyncStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(filtered));
  },

  async clearFavorites(){
    await AsyncStorage.setItem(FAV_STORAGE_KEY, '');
  },

  async getFavorites() {
    const favorites = await AsyncStorage.getItem(FAV_STORAGE_KEY);

    if (favorites && favorites.length > 0) {
      return JSON.parse(favorites);
    }    
    return [];
  },

  async handleFavoritesClick(item) {
    const favorites = await this.getFavorites();

    var result = favorites.find(obj => {
      return obj.id === item.id;
    });

    if (!result) {
      await this.saveFavorites(item);      
    } else {
      await this.removeFavorite(item);
    }
  }

};