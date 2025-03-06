# 3 курс
# Кочнев Сергей Валерьевич
# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Документация

## Интерфейсы данных

### IProduct

Описывает структуру товара.

- `category`: `string` - Категория товара.
- `title`: `string` - Название товара.
- `img`: `string` - URL изображения товара.
- `price`: `number | null` - Цена товара (может быть `null`).
- `description`: `string` - Описание товара.
- `id`: `number` - Уникальный идентификатор товара.
- `isAddedBasket`: `boolean` - Флаг, указывающий, добавлен ли товар в корзину.

### IOrderForm

Описывает данные формы заказа.

- `address`: `string` - Адрес доставки.
- `payment_method`: `'online' | 'offline'` - Способ оплаты.
- `email`: `string` - Email клиента.
- `number_telephone`: `string` - Номер телефона клиента.
- `total_price`: `number` - Общая стоимость заказа.

### IOrder

Интерфейс заказа, расширяющий `IOrderForm`.

- `items`: `number[]` - Массив ID товаров в заказе.

### IBasket

Описывает структуру корзины.

- `items`: `IProduct[]` - Массив товаров в корзине.
- `total_price`: `number` - Общая стоимость товаров в корзине.

### IBasketModel

Интерфейс модели корзины, расширяющий `IBasket`.

- `add(product: IProduct): void` - Добавляет товар в корзину.
- `remove(id: number): void` - Удаляет товар из корзины по ID.

### ICatalogModel

Интерфейс модели каталога.

- `items`: `IProduct[]` - Массив товаров в каталоге.
- `setItems(items: IProduct[]): void` - Устанавливает товары в каталоге.
- `getProduct(id: number): IProduct` - Возвращает товар по ID.

### IOrderModel

Интерфейс модели заказа.

- `order`: `IOrder` - Информация о заказе.
- `setProducts(items: IProduct[]): void` - Устанавливает товары для заказа.
- `setAddressAndPayment(address: string, payment: Pick<IOrder, 'payment_method'>): void` - Устанавливает адрес доставки и способ оплаты.
- `setEmailAndNumber(email: string, number: string): void` - Устанавливает email и номер телефона клиента.
- `makeOrder(): void` - Оформляет заказ.
