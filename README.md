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

### IOrder

Описывает данные формы заказа.

- `address`: `string` - Адрес доставки.
- `payment_method`: `'online' | 'offline'` - Способ оплаты.
- `email`: `string` - Email клиента.
- `number_telephone`: `string` - Номер телефона клиента.
- `total_price`: `number` - Общая стоимость заказа.
- `items`: `number[]` - Массив ID товаров в заказе.

### IModal

Описывает модальное окно

- `onClickClose()`: `void` - Закрытие окна
- `onClickOpen()`: `void` - Открытие окна

### IBasketModel

Интерфейс модели корзины, наследует EventEmitter для регистрации событий

- `items`: `IProduct[]` - Массив товаров в корзине.
- `total_price`: `number` - Общая стоимость товаров в корзине
- `add(product: IProduct): void` - Добавляет товар в корзину.
- `remove(id: number): void` - Удаляет товар из корзины по ID.

### IBasketView

Интерфейс отображения корзины, наследует IModal для открытия в модальном окне и EventEmitter для регистрации событий

- `onClickDeleteItem(id: number)`: `void` - регистрирует событие на удаление продукта в брокер
- `onClickMakeOrder()`: `void` - регистрирует событие создание заказа в брокер
- `bindListeners()`: `void` - добаляет на элементы слушатели событий
- `render(cartItems: IProduct[], totalPrice: number)`: `void` - рендерит корзину

### ICardProductView

Интерфейс отображения модального окна товара, наследует IModal для открытия в модальном окне и EventEmitter для регистрации событий

- `onClickAddInBasket(id: number)`: `void` - регистрирует событие добавления товара в корзину в брокер
- `bindListeners()`: `void` - добаляет на элементы слушатели событий
- `render(cartItems: IProduct[], totalPrice: number)`: `void` - рендерит окно товара

### IOrderModel

Интерфейс модели заказа, наследует EventEmitter для регистрации событий

- `order`: `IOrder` - Информация о заказе.
- `setProducts(items: IProduct[]): void` - Устанавливает товары для заказа.
- `setAddressAndPayment(address: string, payment: Pick<IOrder, 'payment_method'>): void` - Устанавливает адрес доставки и способ оплаты.
- `setEmailAndNumber(email: string, number: string): void` - Устанавливает email и номер телефона клиента.
- `postOrder(formFields: IOrder): Promise<object>;` - Отправляет заказ на сервер.

### IOrderViewFirst

Интерфейс отображения 1 части заказа, наследует IModal для открытия в модальном окне и EventEmitter для регистрации событий

- `onChangePayment(payment: PaymentMethod)`: `void` - регистрирует событие изменения способа оплаты
- `onChangeAddress(value: string)`: `void` - регистрирует событие изменения поля адреса
- `onClickNext()`: `void` - регистрирует событие перехода к следующему окну заказа
- `bindListeners()`: `void` - добаляет на элементы слушатели событий
- `render(payment: PaymentMethod, value: string)`: `void` - рендерит окно 1 части заказа

### IOrderViewSecond

Интерфейс отображения 2 части заказа, наследует IModal для открытия в модальном окне и EventEmitter для регистрации событий

- `onChangeEmail(value: string)`: `void` - регистрирует событие изменения поля почты
- `onChangeNumber(value: string)`: `void` - регистрирует событие изменения поля номера
- `onClickPay()`: `void` - регистрирует событие перехода к оплате
- `bindListeners()`: `void` - добаляет на элементы слушатели событий
- `render(payment: PaymentMethod, value: string)`: `void` - рендерит окно 2 части заказа

### IOrderViewFinal

Интерфейс отображения оплаты заказа, наследует IModal для открытия в модальном окне и EventEmitter для регистрации событий

- `onClickExit()`: `void` - закрывает окно
- `bindListeners()`: `void` - добаляет на элементы слушатели событий
- `render(payment: PaymentMethod, value: string)`: `void` - рендерит окно оплаты заказа

### IProductListModel

Интерфейс модели каталога, наследует EventEmitter для регистрации событий

- `items`: `IProduct[]` - Массив товаров в каталоге.
- `setItems(items: IProduct[]): void` - Устанавливает товары в каталоге.
- `getItems(url: string): Promise<IProduct[]>` - Получает список товаров с сервера.
- `getItem(id: number)`: `IProduct` - получение товара по id

### IProductListView

Интерфейс отображения каталога, наследует EventEmitter для регистрации событий

- `onClickProduct(id: number)`: `void` - регистрирует событие открытия окна товара
- `bindListeners()`: `void` - добаляет на элементы слушатели событий
- `render(payment: PaymentMethod, value: string)`: `void` - рендерит каталог
