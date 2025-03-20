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

## Архитектура проекта

В данном проекте используется архитектурный паттерн MVP (Model-View-Presenter).

- `Model`: Логика отвечает за управление состоянием корзины, хранение и предоставление доступа к списку товаров в каталоге.
- `View`: Отображает данные в пользовательском интерфейсе приложения. Используется брокер событий для взаимодействия всех частей приложения.
- `Presenter`: Отвечает за обработку событий, взаимодействие между Model и View, обновление представлений.

Базовые классы:

- `Класс Api` Предоставляет базовый функционал для взаимодействия с API, абстрагируя работу с HTTP запросами.
- `Класс EventEmitter` Обеспечивает работу событий, позволяя другим частям приложения регистрировать обработчики на события и уведомлять их при возникновении события.

## Интерфейсы данных

### IProduct

Описывает структуру товара.

- `category`: `string` - Категория товара.
- `title`: `string` - Название товара.
- `img`: `string` - URL изображения товара.
- `price`: `number | null` - Цена товара (может быть `null`).
- `description`: `string` - Описание товара.
- `id`: `number` - Уникальный идентификатор товара.

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

### IBasketModel

Интерфейс модели корзины.

- `items`: `IProduct[]` - Массив товаров в корзине.
- `total_price`: `number` - Общая стоимость товаров в корзине
- `add(product: IProduct): void` - Добавляет товар в корзину.
- `remove(id: number): void` - Удаляет товар из корзины по ID.

### ICatalogModel

Интерфейс модели каталога.

- `items`: `IProduct[]` - Массив товаров в каталоге.
- `setItems(items: IProduct[]): void` - Устанавливает товары в каталоге.
- `getItems(url: string): Promise<IProduct[]>` - Получает список товаров с сервера.

### IOrderModel

Интерфейс модели заказа.

- `order`: `IOrder` - Информация о заказе.
- `setProducts(items: IProduct[]): void` - Устанавливает товары для заказа.
- `setAddressAndPayment(address: string, payment: Pick<IOrder, 'payment_method'>): void` - Устанавливает адрес доставки и способ оплаты.
- `setEmailAndNumber(email: string, number: string): void` - Устанавливает email и номер телефона клиента.
- `postOrder(formFields: IOrder): Promise<object>;` - Отправляет заказ на сервер.

### IProductCardModel

Интерфейс модели карточки товара.

- `product` : `IProduct` - информация о товаре.
- `etProduct(id: number): Promise<IProduct>` - получает тоавр по id с сервера;

### IView

- `element` : `HTMLElement` - корневой HTML-элемент представления.
- `createElement(tagName: string, className?: string): HTMLElement;` - информация о товаре.
- `addChild(child: Node): void;` - информация о товаре.
- `render(): HTMLElement;` - информация о товаре.
