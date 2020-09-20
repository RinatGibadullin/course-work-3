import { CategoriesEnum } from "../enums/CategoriesEnum"

export const useCategoryTranslate = (category: CategoriesEnum) => {
    switch (category) {
        case 'VEGETABLE': return "Овощи"
        case "FRUIT": return "Фрукты"
        case 'NUT': return "Орехи"
        case "BERRY": return "Ягоды"
        case 'MUSHROOM': return "Грибы"
        case "HONEY": return "Мед"
        case 'GREEN_AND_SPICE': return "Зелень и специи"
        case "DRIED_FRUITS": return "Сухофрукты"
        case "DRINKS": return "Напитки"
        default: return category
    }
}