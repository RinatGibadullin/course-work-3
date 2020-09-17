export const required = (value: string) => {
    if (value) return undefined

    return "Обязательное поле"
}

export const requiredNumber = (value: any) => {
    if (!isNaN(value)) return undefined

    return "Допустимы только числа"
}
export const requiredCreator = (errorMessage: string) => (value: string) => {
    if (value) return undefined

    return `${errorMessage}`
}

export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value?.length > maxLength) return `Максимальная длина - ${maxLength}`

    return undefined
}

export const email = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Некорректный email' : undefined

export const time = (value: string) =>
    value && !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/i.test(value) ?
    'Некорректное время' : undefined