import * as React from "react";
import * as Icon from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import FavoritesService from "../services/FavoritesService";
import { useEffect, useState } from "react";

export default function FavoriteIcon(props) {
  const [favoriteQuestions, setFavoriteQuestions] = useState([]);

  useEffect(() => {
    const init = async () => {
      await _getFavoritesAsync();
    };
    init();
  }, []);

  const _getFavoritesAsync = async () => {
    const questionSet = await FavoritesService.getFavorites();
    setFavoriteQuestions(questionSet);
  };

  const _determineFavorite = () => {
    let stared = false;

    const favorite = favoriteQuestions.find((favorite) => {
      return favorite.id === props.question.id;
    });

    if (favorite) {
      stared = true;
    }

    return stared;
  };

  const _handleFavoriteClick = async () => {
    await FavoritesService.handleFavoritesClick(props.question);
    await _getFavoritesAsync();
  };

  const stared = _determineFavorite();

  return (
    <TouchableOpacity onPress={_handleFavoriteClick}>
      <Icon.Octicons
        name={stared ? "heart-fill" : "heart"}
        size={stared ? 37 : 35}
        color={Colors.constants.danger}
      />
    </TouchableOpacity>
  );
}
