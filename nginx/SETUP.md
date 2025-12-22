# Пошаговая инструкция по настройке Nginx на сервере

## Шаг 1: Установка Nginx (если еще не установлен)

```bash
# Для Ubuntu/Debian
sudo apt update
sudo apt install nginx -y

# Для CentOS/RHEL
sudo yum install nginx -y
# или для новых версий
sudo dnf install nginx -y

# Проверьте статус
sudo systemctl status nginx
```

## Шаг 2: Резервная копия существующих конфигураций (если есть)

```bash
# Создайте резервную копию текущей конфигурации
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup
sudo cp -r /etc/nginx/conf.d /etc/nginx/conf.d.backup 2>/dev/null || true
```

## Шаг 3: Копирование конфигурационных файлов

```bash
# Скопируйте основной конфиг nginx
sudo cp /nginx/nginx.conf /etc/nginx/nginx.conf

# Создайте директорию для конфигов серверов (если не существует)
sudo mkdir -p /etc/nginx/conf.d

# Скопируйте конфигурации серверов
sudo cp /nginx/conf.d/frontend.conf /etc/nginx/conf.d/
sudo cp /nginx/conf.d/backend.conf /etc/nginx/conf.d/
```

## Шаг 4: Настройка SSL сертификатов

### Вариант A: Использование Let's Encrypt (рекомендуется)

```bash
# Установите certbot
sudo apt install certbot python3-certbot-nginx -y
# или для CentOS
sudo yum install certbot python3-certbot-nginx -y

# Получите сертификаты для всех доменов
sudo certbot --nginx -d lead-form.website -d www.lead-form.website -d api.lead-form.website

# Certbot автоматически обновит конфигурации nginx
```

### Вариант B: Использование собственных сертификатов

```bash
# Создайте директорию для SSL сертификатов
sudo mkdir -p /etc/nginx/ssl

# Скопируйте ваши сертификаты
sudo cp /path/to/your/lead-form.website.crt /etc/nginx/ssl/
sudo cp /path/to/your/lead-form.website.key /etc/nginx/ssl/

# Установите правильные права доступа
sudo chmod 600 /etc/nginx/ssl/lead-form.website.key
sudo chmod 644 /etc/nginx/ssl/lead-form.website.crt
sudo chown root:root /etc/nginx/ssl/lead-form.website.*
```

**Если у вас еще нет SSL сертификатов**, временно закомментируйте SSL блоки в конфигах или используйте самоподписанный сертификат:

```bash
# Создание самоподписанного сертификата (только для тестирования!)
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/lead-form.website.key \
  -out /etc/nginx/ssl/lead-form.website.crt \
  -subj "/C=RU/ST=State/L=City/O=Organization/CN=lead-form.website"
```

## Шаг 5: Настройка DNS записей

Убедитесь, что DNS записи настроены правильно:

```
A запись:     lead-form.website     -> IP_ВАШЕГО_СЕРВЕРА
A запись:     www.lead-form.website -> IP_ВАШЕГО_СЕРВЕРА
A запись:     api.lead-form.website -> IP_ВАШЕГО_СЕРВЕРА
```

Проверьте DNS:

```bash
dig lead-form.website
dig api.lead-form.website
```

## Шаг 6: Проверка конфигурации

```bash
# Проверьте синтаксис конфигурации nginx
sudo nginx -t

# Если есть ошибки, исправьте их перед продолжением
```

## Шаг 7: Запуск/перезапуск Nginx

```bash
# Если nginx не запущен
sudo systemctl start nginx

# Если nginx уже запущен, перезапустите его
sudo systemctl reload nginx
# или
sudo systemctl restart nginx

# Включите автозапуск при загрузке системы
sudo systemctl enable nginx
```

## Шаг 8: Проверка работы

### Проверьте статус nginx:
```bash
sudo systemctl status nginx
```

### Проверьте логи:
```bash
# Основные логи
sudo tail -f /var/log/nginx/error.log

# Логи фронтенда
sudo tail -f /var/log/nginx/frontend-access.log
sudo tail -f /var/log/nginx/frontend-error.log

# Логи бэкенда
sudo tail -f /var/log/nginx/backend-access.log
sudo tail -f /var/log/nginx/backend-error.log
```

### Проверьте доступность:
```bash
# Проверьте HTTP редирект
curl -I http://lead-form.website

# Проверьте HTTPS (может потребоваться -k для самоподписанного сертификата)
curl -I https://lead-form.website
curl -I https://api.lead-form.website
```

## Шаг 9: Настройка файрвола

Откройте необходимые порты:

```bash
# Для UFW (Ubuntu)
sudo ufw allow 'Nginx Full'
# или отдельно
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Для firewalld (CentOS/RHEL)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Для iptables
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

## Шаг 10: Обновление CORS в бэкенде

Обновите файл `backend/src/main.ts`:

```typescript
app.enableCors({
  origin: [
    'https://lead-form.website',
    'https://www.lead-form.website',
    'http://localhost:3000' // для разработки
  ],
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-waf-captcha-token'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
});
```

После изменения пересоберите и перезапустите бэкенд.

## Шаг 11: Убедитесь, что приложения запущены

```bash
# Проверьте, что фронтенд работает на порту 3000
curl http://localhost:3000

# Проверьте, что бэкенд работает на порту 9000
curl http://localhost:9000/health
```

## Частые проблемы и решения

### Проблема: "nginx: [emerg] bind() to 0.0.0.0:80 failed"
**Решение:** Другой процесс использует порт 80. Найдите и остановите его:
```bash
sudo lsof -i :80
sudo kill -9 <PID>
```

### Проблема: "502 Bad Gateway"
**Решение:** 
- Убедитесь, что приложения запущены на портах 3000 и 9000
- Проверьте логи: `sudo tail -f /var/log/nginx/error.log`

### Проблема: SSL сертификат не работает
**Решение:**
- Проверьте пути к сертификатам в конфигах
- Убедитесь, что права доступа правильные (600 для ключа, 644 для сертификата)
- Проверьте срок действия сертификата: `openssl x509 -in /etc/nginx/ssl/lead-form.website.crt -noout -dates`

### Проблема: CORS ошибки
**Решение:**
- Убедитесь, что в бэкенде обновлены CORS настройки
- Проверьте, что заголовки в nginx конфиге совпадают с настройками бэкенда

## Автоматическое обновление SSL сертификатов (Let's Encrypt)

Если используете Let's Encrypt, настройте автоматическое обновление:

```bash
# Проверьте, что таймер работает
sudo systemctl status certbot.timer

# Если нет, включите его
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

## Полезные команды

```bash
# Перезагрузка конфигурации без остановки сервера
sudo nginx -s reload

# Проверка конфигурации
sudo nginx -t

# Просмотр активных конфигураций
sudo nginx -T

# Остановка nginx
sudo systemctl stop nginx

# Запуск nginx
sudo systemctl start nginx
```

