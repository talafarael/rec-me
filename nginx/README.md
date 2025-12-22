# Nginx Configuration для lead-form.website

## Структура файлов

- `nginx.conf` - основная конфигурация nginx
- `conf.d/frontend.conf` - конфигурация для фронтенда (lead-form.website)
- `conf.d/backend.conf` - конфигурация для бэкенда (api.lead-form.website)

## Установка

### 1. Скопируйте файлы конфигурации

```bash
# Скопируйте основной конфиг
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf

# Скопируйте конфигурации серверов
sudo cp nginx/conf.d/*.conf /etc/nginx/conf.d/
```

### 2. Установите SSL сертификаты

Поместите SSL сертификаты в `/etc/nginx/ssl/`:

- `lead-form.website.crt` - сертификат
- `lead-form.website.key` - приватный ключ

Или используйте Let's Encrypt:

```bash
sudo certbot --nginx -d lead-form.website -d www.lead-form.website -d api.lead-form.website
```

### 3. Проверьте конфигурацию

```bash
sudo nginx -t
```

### 4. Перезапустите nginx

```bash
sudo systemctl restart nginx
```

## Настройка портов

По умолчанию:

- **Frontend (Next.js)**: порт 3000
- **Backend (NestJS)**: порт 9000

Если ваши приложения работают на других портах, измените соответствующие значения `proxy_pass` в конфигурационных файлах.

## Обновление CORS в бэкенде

После развертывания обновите CORS настройки в `backend/src/main.ts`:

```typescript
app.enableCors({
  origin: ["https://lead-form.website", "http://localhost:3000"],
  // ... остальные настройки
});
```

## Логи

Логи доступны в:

- `/var/log/nginx/frontend-access.log` - доступ к фронтенду
- `/var/log/nginx/frontend-error.log` - ошибки фронтенда
- `/var/log/nginx/backend-access.log` - доступ к бэкенду
- `/var/log/nginx/backend-error.log` - ошибки бэкенда

<script type="text/javascript" src="https://d6239dbced10.us-east-1.captcha-sdk.awswaf.com/d6239dbced10/jsapi.js" defer></script>

XgjIuQN6ootDOfctYnRBolCqch+gZS87KzL9JaxEQoyT9QRIhs92RF1Ow9XVzYrpFn5MSlinUlmyHgMwxZxXCRvxvY6yiE6Cu266d7r0xJ3ZQhnO6HqPzWLTlf7OrJYEan0IuCQiPTYlylH7dvNPhlGdAis01HTOUSUYE4wYlI12++ErkMcHns20GZSFy7N8mX/Jm/UO/p2RBzzardvWxX8pBPZG//jBTf66n722wLDXsIIbdceDoPSyVA2s2dWsW8aizuHcaYqn7sKJ5OUcEvId7pif93avPJyNM41PA77kYnF2v/92w8/59JzBYoRIBz7EzTATKAdmjLxwMnaJxwXK/5Xa7ckdWu1TKO+5F5KGCUEqwJC7loD5lwQM5UH4WqcqOQXB41t9Qn4zhUoaUSSgih7VmIgIa66pD9FhC7Q8FoopcEM1e81Wrp1MFW4bNR45qCUtepSkTVUqemDQ5yGbZ3ETer1c75YF/dh0SFiKMzSwhCT4otrwQuF/EmwGZEJN5ejSk7Ba+VvbtaO/RBNb+HPvcMiOEeZEdcPHjCmA/oJzXAUh7WCYR73PxZEa8BXwfzM5x1TChyxIUpg5c+H8JqKqMXj1y31C3u3U0KryWZKnN+kPtKQDUFR0YfyfTA8983xFjoSCJS5oFryWs7XvMf/Mwf7YdlsFzuWf1aM=\_0_1
